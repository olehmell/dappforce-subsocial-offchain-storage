import { runQuery } from '../utils';
import { log } from '../postges-logger';

const query = `
  SELECT nonce FROM df.nonces
  WHERE main_key = :mainKey`

export const getNonce = async (mainKey: string)  => {
  try {
    const data = await runQuery(query, { mainKey })
      return data?.rows[0]
    } catch (err) {
    log.error(`Failed to get nonce by account: ${mainKey}`, err.stack)
    throw err
  }
}