# File input security by example

## Week 28 project journaling

What are the risks for the following scenario?

PDF and Text file(s) are uploaded via a file input form field on a public website.
On form submit, a [server action](https://react.dev/reference/rsc/server-actions) is called with the form data.  
On the Node server, the file is uploaded to S3.
The files are not fetched or displayed again to any user.
For now they are only analysed by the company's data team.
In future, it could be processed by the company's more sophisticated document processing pipelines before the content is displayed back to a user.

The website page is public, anyone with the link can access it.
However, it is intended to only be shared internally and will not be crawlable by Google.

### Example 1: XSS risk

An attacker embeds a malicious script in an asset that is executed when the asset is downloaded and displayed to another user. For example, an HTML or SVG file with an `<img>` tag that includes an `onerror` event callback. When the image load errors, the callback executes the attacker's script on _your domain_ using _your cookies_ for that user ([1](https://env.fail/posts/aws-s3/)). Is this a risk for our scenario?

**No**, in our case the file assets are not fetched and displayed again on the client so there is no risk of XSS, i.e. they are not publicly retrievable. As a precaution though, we should exclude HTML and SVG file types that are common vectors for XSS attacks (to do 1).

### Example 2: Overwrite an existing file risk

An attacker generated a valid presigned POST URL to a bucket on S3, but then swaps out the key for another. Unless there is a check in place that the key is in use, the attacker can overwrite the content of another user ([1](https://env.fail/posts/aws-s3/)). Is this a risk for our scenario?

**No**, pre-signed POST URLs are not being used. Instead, the file is uploaded to a UUID key randomly generated on the server. Because the asset is not sent again to the client it is also impossible for an attacker to know what the key is. The overwrite risk is the UUID collision risk.

### Example 3: Send huge files that risk damaging the server availability

ZIP bombs, XML bombs (the billion laughs attack), or simply huge files can fill the server storage and hinder the server's availability ([2](https://cheatsheetseries.owasp.org/cheatsheets/File_Upload_Cheat_Sheet.html)). Is this a risk for our scenario?

**Yes**

## To do

1. validate files are PDF and Text types
2. limit the file size and simultaneous upload number to something the server can handle

## References

1. <https://env.fail/posts/aws-s3/>
2. <https://cheatsheetseries.owasp.org/cheatsheets/File_Upload_Cheat_Sheet.html>