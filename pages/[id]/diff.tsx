import { GetServerSideProps } from 'next';
import { getSession } from 'next-auth/client';

import { User, PasteStatus, PasteVisibility } from '@prisma/client';

import DiffPastePage, {
  DiffPastePageProps,
} from '@/components/pages/DiffPastePage';
import { AccessForbiddenError, ResourceNotFoundError } from '@/lib/errors';
import prisma from '@/lib/prisma';

function PastePage(props: DiffPastePageProps) {
  return <DiffPastePage {...props} />;
}

export default PastePage;

export const getServerSideProps: GetServerSideProps = async ({
  req,
  res,
  params,
  query,
}) => {
  const session = await getSession({ req });

  const { id } = params as any;
  const { left, right } = query as any;

  const paste = await prisma.paste.findFirst({
    where: { id },
  });

  if (!paste) {
    return {
      props: {
        error: ResourceNotFoundError.toProps(),
      },
    };
  }

  let user: User;
  if (session) {
    user = await prisma.user.findFirst({
      where: { email: session.user.email },
    });
  }

  if (paste.status !== PasteStatus.OK) {
    return {
      props: {
        error: AccessForbiddenError.toProps(),
      },
    };
  }

  if (paste.visibility === PasteVisibility.PRIVATE) {
    if (!user || paste.creatorId !== user.id) {
      return {
        props: {
          error: AccessForbiddenError.toProps(),
        },
      };
    }
  }

  const leftRev = await prisma.pasteRev.findFirst({
    where: { paste, id: parseInt(left, 10) },
  });

  const rightRev = await prisma.pasteRev.findFirst({
    where: { paste, id: parseInt(right, 10) },
  });

  if (!leftRev || !rightRev) {
    return {
      props: {
        error: ResourceNotFoundError.toProps(),
      },
    };
  }

  return {
    props: {
      paste,
      leftRev,
      rightRev,
    },
  };
};
