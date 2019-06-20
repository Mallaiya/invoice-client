import React from 'react';

export default (props) => {
  const bodyRef = React.createRef();
  //const createPdf = () => props.createPdf(bodyRef.current);
  return (
    <section className="pdf-container">
      {/* <section className="pdf-toolbar">
        <p>Click here to generate PDF directly</p>
        <button onClick={createPdf}>Click</button>
      </section> */}
      <section className="pdf-body" ref={bodyRef}>
        {props.children}
      </section>
    </section>
  )
}