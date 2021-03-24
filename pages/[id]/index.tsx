import { Paste, PasteRev } from '.prisma/client';
import prisma from 'lib/prisma';
import { GetServerSideProps } from 'next';
import { getSession } from 'next-auth/client';

type SinglePasteRev = Paste & {
  rev: PasteRev;
};

type ViewPasteProps = {
  paste: SinglePasteRev;
};

type ViewPasteParams = {
  id: string;
};

export const getServerSideProps: GetServerSideProps = async ({ req, res, params }) => {
  const session = getSession({ req });
  const pasteId = params;

  const paste = await prisma.paste.findFirst({});
  const pasteRev = await prisma.pasteRev.findFirst({});

  return {
    props: {
      paste: {
        ...paste,
        rev: pasteRev,
      },
    },
  };
};

function PastePage({ paste }: ViewPasteProps) {
  return <div>paste page {paste.rev}</div>;
}

export default PastePage;
