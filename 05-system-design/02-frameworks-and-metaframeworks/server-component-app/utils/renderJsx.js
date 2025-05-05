import escapeHtml from  'escape-html';

export function renderJSXToHTML(jsx) {
    if (typeof jsx === "string" || typeof jsx === "number") {
      return escapeHtml(jsx);
    } else if (jsx == null || typeof jsx === "boolean") {
      return "";
    } else if (Array.isArray(jsx)) {
      return jsx.map((child) => renderJSXToHTML(child)).join("");
    } else if (typeof jsx === "object") {
      if (jsx.$$typeof === Symbol.for("react.element") || jsx.$$typeof === Symbol.for("react.transitional.element")) {
        if (typeof jsx.type === "function") {
          // Is it a component like <BlogPostPage>?
          // Call the component with its props, and turn its returned JSX into HTML.
          const Component = jsx.type;
          const props = jsx.props;
          const returnedJsx = Component(props);
          return renderJSXToHTML(returnedJsx); 
        }
        if (typeof jsx.type === "string") { // Is this a tag like <div>?
          let html = "<" + jsx.type;
          for (const propName in jsx.props) {
            if (jsx.props.hasOwnProperty(propName) && propName !== "children") {
              html += " ";
              html += propName;
              html += "=";
              html += escapeHtml(jsx.props[propName]);
            }
          }
          html += ">";
          html += renderJSXToHTML(jsx.props.children);
          html += "</" + jsx.type + ">";
          return html;
        }
      } else throw new Error("Cannot render an object.");
    } else throw new Error("Not implemented.");
  }