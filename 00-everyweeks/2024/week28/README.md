# Week 28 project journaling: File input security by example

## 📖 Scenario: A _hypothetical_ team...

A _hypothetical_ team builds a file input form field on a public website where users can upload PDF and Text file(s).

On form submit, a [server action](https://react.dev/reference/rsc/server-actions) is called with the form data. On the Node server, the file is uploaded to S3. The files are not fetched or displayed again to any user, but in future the file could be processed by more sophisticated "document processing pipelines" before the _content_ (not the original document) is displayed to a user.

The website page is public, anyone with the link can access it. However, it is intended to only be shared internally and will not be crawlable by Google.

❓ _What are the security risks?_

### Risk 1: XSS and "client-side active content"

An attacker embeds a malicious script in an asset that is executed when the asset is downloaded and displayed to another user. For example, an HTML or SVG file with an `<img>` tag that includes an `onerror` event callback. When the image load errors, the callback executes the attacker's script on _your domain_ using _your cookies_ for that user ([1](https://env.fail/posts/aws-s3/)). Is this a risk for our scenario?

**No**, in our case the file assets are not fetched and displayed again on the client, i.e. they are not publicly retrievable, so there is no risk of XSS. As a precaution though, we should exclude HTML and SVG file types that are common vectors for XSS attacks (💡 To do #1).

### Risk 2: Overwriting an existing file

An attacker generates a presigned POST URL to an S3 bucket, but then swaps out the bucket key for another. Unless there is a check in place that the key is already in use the attacker can overwrite the content of another user ([1](https://env.fail/posts/aws-s3/)). Is this a risk for our scenario?

**No**, the file is uploaded to the server where a UUID key is randomly generated. Because the asset is not sent again to the client it is also impossible for an attacker to know what that key is. The overwrite risk is the UUID collision risk.

### Risk 3: Sending huge files that damage server availability

[ZIP bombs](https://en.wikipedia.org/wiki/Zip_bomb), [XML bombs](https://en.wikipedia.org/wiki/Billion_laughs_attack), or simply huge files can fill the server memory or storage and harm the server's availability ([2](https://cheatsheetseries.owasp.org/cheatsheets/File_Upload_Cheat_Sheet.html)). Is this a risk for our scenario?

**Yes**, the Node servers are limited in memory, so a constraint on the size and number of files uploaded simultenously needs to be put in place (💡 To do #2).

## Scenario: the team adds some validation

From the previous analysis the team came up with these two, "Security to dos":

1. validate files are only PDF and Text types
2. limit the file size and upload number

To address this security checklist, for this input element,

```tsx
<input accept=".pdf,.txt" multiple onChange={handleFileChange} type="file" />
```

the following client-side logic was subsequently implemented:

```ts
import { z } from 'zod';

const NOTES_FILES = {
    ACCEPTED_TYPES: ['application/pdf', 'text/plain'],
    MAX_COUNT: 10,
    MAX_SIZE: 200,
};

export const filesSchema = z
    .array(
        z
            .instanceof(File)
            .refine(
                (file) => file.size <= NOTES_FILES.MAX_SIZE * 1024 * 1024,
                `File size must be less than ${NOTES_FILES.MAX_SIZE} MB`,
            )
            .refine((file) => NOTES_FILES.ACCEPTED_TYPES.includes(file.type), 'File must be a PDF or text file'),
    )
    .nonempty()
    .max(NOTES_FILES.MAX_COUNT);
```

❓ _Was this sufficient to address the security risks?_

### Validation 1: check files are only PDF and Text types

The `accept=".pdf,.txt"` HTML attribute value isn't sufficient since it doesn't do any validation,

> The accept attribute doesn't validate the types of the selected files; it provides hints for browsers to guide users towards selecting the correct file types. It is still possible (in most cases) for users to toggle an option in the file chooser that makes it possible to override this and select any file they wish, and then choose incorrect file types. ([3](https://developer.mozilla.org/en-US/docs/Web/HTML/Attributes/accept#overview))

The schema validation implemented with the `zod` library uses the `file.type` property to check that the MIME type matches an allowed list. However, the `file.type` is inferred from the file extension,

> Based on the current implementation, browsers won't actually read the bytestream of a file to determine its media type. It is assumed based on the file extension; a PNG image file renamed to .txt would give "text/plain" and not "image/png". ... Developers are advised not to rely on this property as a sole validation scheme. ([4](https://developer.mozilla.org/en-US/docs/Web/API/Blob/type))

**No**, the current validations aren't sufficient to limit the file type. Users can override the file chooser to select any file, and the MIME type is inferred from the extension, which can be faked. A more robust approach involves reading the first few bytes of the file, since many file formats can be identified by their "magic numbers" at the start of the file. This could be implemented on the server, using the [file-type](https://www.npmjs.com/package/file-type) package, for example. However, given the files are not publicly retrievable and would be processed before the contents were made available later, the security return for time investment is low.

### Validation 2: limit the file size and upload number

**Yes**, `file.size` is, "the number of bytes of data contained within the Blob (or Blob-based object, such as a File)" ([5](https://developer.mozilla.org/en-US/docs/Web/API/Blob/size#value)) so we can rely on this value for accurate validation. Since the the validation is executed on the client, too large paylods will be blocked before they reach the server and affect its availability.

The team merges the code and calls it a day. 🍻

❓ _Are all the security risks exhaustively covered?_

**No**, but implementation effort was weighed against risks, and the team decided they could tolerate, for now, the remaining risks. In your own work, make sure to refer back to the [OWASP File Upload Cheat Sheet](https://cheatsheetseries.owasp.org/cheatsheets/File_Upload_Cheat_Sheet.html) to check your risk tolerance.

## References

1. <https://env.fail/posts/aws-s3/>
2. <https://cheatsheetseries.owasp.org/cheatsheets/File_Upload_Cheat_Sheet.html>
3. <https://developer.mozilla.org/en-US/docs/Web/HTML/Attributes/accept#overview>
4. <https://developer.mozilla.org/en-US/docs/Web/API/Blob/type>
5. <https://developer.mozilla.org/en-US/docs/Web/API/Blob/size#value>
