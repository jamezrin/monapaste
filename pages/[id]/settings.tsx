import { GetServerSideProps } from 'next';

function PasteSettingsPage({ pasteId }) {
  return <div>settings of {pasteId}</div>;
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  return {
    props: {
      pasteId: context.params.id,
    },
  };
};

export default PasteSettingsPage;
