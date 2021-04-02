import { User, PasteStatus, PasteVisibility } from '@prisma/client';
import { GetServerSideProps } from 'next';
import { getSession } from 'next-auth/client';

import prisma from 'lib/prisma';
import { AccessForbiddenError, ResourceNotFoundError } from 'lib/errors';
import SinglePastePage, {
  SinglePagePasteProps,
} from 'components/pages/SinglePastePage';

type QueryParams = {
  id: string;
};

function PastePage(props: SinglePagePasteProps) {
  return <SinglePastePage {...props} />;
}

export default PastePage;

export const getServerSideProps: GetServerSideProps = async ({
  req,
  res,
  params,
}) => {
  const session = await getSession({ req });

  const { id } = params as QueryParams;

  const paste = await prisma.paste.findFirst({
    where: { id },
  });

  if (!paste) {
    return {
      props: {
        error: ResourceNotFoundError.toProps()
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
        error: AccessForbiddenError.toProps()
      },
    };
  }

  if (paste.visibility === PasteVisibility.PRIVATE) {
    if (!user || paste.creatorId !== user.id) {
      return {
        props: {
          error: AccessForbiddenError.toProps()
        },
      };
    }
  }

  const pasteRev = await prisma.pasteRev.findFirst({
    where: { paste },
    orderBy: {
      createdAt: 'desc',
    },
    take: 1,
  });

  return {
    props: {
      paste,
      pasteRev,
    },
  };
};
