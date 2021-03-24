function ResetButton(props) {
  return (
    <>
      <style jsx>{`
        button {
          background: none;
          border: inherit;
          cursor: pointer;
          outline: inherit;
          font: inherit;
        }
      `}</style>
      <button {...props} />
    </>
  );
}

export default ResetButton;
