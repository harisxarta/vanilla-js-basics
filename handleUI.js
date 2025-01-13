// var HandleUi = pc.createScript('handleUi');

// var css = `
//      body {
//         -webkit-user-select: none;
//         -moz-user-select: none;
//         -ms-user-select: none;
//         user-select: none;
//     }
//     input[type='range'] { accent-color: #6940ea }
//     /* Add other styles here */
// `;

// HandleUi.attributes.add("html", {
//     type: "asset",
//     assetType: "html",
//     title: "HTML Asset",
// });

// HandleUi.prototype.initialize = function () {
//     if (!this.html || !this.html.resource) {
//         console.error("HTML asset is missing!");
//         return;
//     }

//     this.div = document.createElement("div");
//     this.div.innerHTML = this.html.resource || "";
//     document.body.appendChild(this.div);

//     var style = document.createElement("style");
//     style.type = "text/css";

//     if (style.styleSheet) {
//         style.styleSheet.cssText = css;
//     } else {
//         style.appendChild(document.createTextNode(css));
//     }
//     document.head.appendChild(style);
// };
