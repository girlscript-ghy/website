CMS.registerEditorComponent({
  id: "google_form_embed",
  label: "Embed a Google Form",
  fields: [
    {
      name: "url",
      label: "Google Form URL",
      widget: "string"
    }
  ],
  pattern: /{{<g_form_embed src="([a-zA-Z0-9-_ ]+)" >}}/,
  fromBlock: function(match) {
    return {
      url: match[1]
    };
  },
  toBlock: function(obj) {
    return `{{<g_form_embed url="${obj.url}" }}`;
  },
  toPreview: function(obj) {
    return `<iframe src="${obj.url}?embedded=true" width="100%" height="1021" frameborder="0" marginheight="0" marginwidth="0">Loading…</iframe>`;
  }
});
