function DOMtoString(document_root) {
  var html = '',
      node = document_root.firstChild;
  while (node) {
      switch (node.nodeType) {
      case Node.ELEMENT_NODE:
          html += node.outerHTML;
          break;
      case Node.TEXT_NODE:
          html += node.nodeValue;
          break;
      case Node.CDATA_SECTION_NODE:
          html += '<![CDATA[' + node.nodeValue + ']]>';
          break;
      case Node.COMMENT_NODE:
          html += '<!--' + node.nodeValue + '-->';
          break;
      case Node.DOCUMENT_TYPE_NODE:
          // (X)HTML documents are identified by public identifiers
          html += "<!DOCTYPE " + node.name + (node.publicId ? ' PUBLIC "' + node.publicId + '"' : '') + (!node.publicId && node.systemId ? ' SYSTEM' : '') + (node.systemId ? ' "' + node.systemId + '"' : '') + '>\n';
          break;
      }
      node = node.nextSibling;
 }
  var form = parseHTML(html);
  return form;
}
function parseHTML(html) {
    var items = document.getElementById("activeCartViewForm").querySelector(`div[data-name="Active Items"]`).querySelectorAll(`div[data-asin]`&& `div[data-quantity]`) ;
    var arrItems = Array.prototype.slice.apply(items);
    var jsonArr = [];
    for (var i = 0; i < arrItems.length; i++) {
        var textName = arrItems[i].getElementsByClassName("a-size-medium a-color-base sc-product-title")[0].innerText;
        jsonArr.push({
            username: localStorage.getItem("username"),
            name: textName,
            price: arrItems[i].dataset.price
        });
    }
    return jsonArr;
}

chrome.runtime.sendMessage({
  action: "getSource",
  source: DOMtoString(document)
});