declare module '*.svg' {
  import * as React from 'react';

  const ReactComponent: React.FunctionComponent<React.SVGProps<SVGSVGElement>>;
  export default ReactComponent;
}
 
declare module '*.css' {
  const content: { [className: string]: string };
  export default content;
}