import { PostId } from '@subsocial/types/substrate/interfaces';
import { ActivitiesParamsWithAccount } from '../queries/types';
import { fillTableWith } from './fillTableQueries';
import { encodeStructId } from '../../substrate/utils';
import { updateCountOfUnreadNotifications } from '../notifications';
import { newPgError } from '../utils';
import { pg } from '../../connections/postgres';

export const fillNotificationsWithCommentFollowers = async (commentId: PostId, { account, blockNumber, eventIndex }: ActivitiesParamsWithAccount) => {
  const query = fillTableWith("notifications", "comment")
  const encodedCommentId = encodeStructId(commentId);
  const params = [encodedCommentId, account, blockNumber, eventIndex];

  try {
    await pg.query(query, params)
    await updateCountOfUnreadNotifications(account)
  } catch (err) {
    throw newPgError(err, fillNotificationsWithCommentFollowers)
  }
}