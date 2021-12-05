import * as React from 'react'

type Props={
  children:React.ReactNode,
  onDrop:(event:React.DragEvent<HTMLDivElement>)=>void
}
export const DropArea:React.FC<Props>=({ children,onDrop }) =>{
 
    const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
      e.stopPropagation();
      e.preventDefault();
    };
   
    const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
      e.stopPropagation();
      e.preventDefault();
   
      onDrop(e);
    };
   
    return (
      <div onDragOver={handleDragOver} onDrop={handleDrop}>
        {children}
      </div>
    );
}
   
    