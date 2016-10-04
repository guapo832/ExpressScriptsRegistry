require.config({
  // app entry point
  deps: ["main"],
  paths:{
	  "text":"text",
	  "react": "../Content/reactbuild/react-withaddons",
	  "JSXTransformer": "JSXTransformer"
  },
  jsx:{
	  fileExtension:'.jsx'}
  });
