import type { Access, Where } from 'payload'

import * as qs from 'qs-esm'

import { checkRole } from '@/access/checkRole'

/**
 * Access control for Orders based on the user's role and the query string
 */
export const adminsOrOrderedByOrPaymentId: Access = ({ data: _data, req, req: { user } }) => {
  if (user && checkRole(['admin'], user)) {
    return true
  }

  const searchParams = req.searchParams
  const where = searchParams.get('where')

  const _query = where ? qs.parse(where) : {}

  // Allow access if user is admin or order owner
  if (user?.id) {
    return {
      orderedBy: {
        equals: user.id,
      },
    } as Where
  }

  if (user?.id) {
    return {
      orderedBy: {
        equals: user.id,
      },
    } as Where
  }

  return false
}
