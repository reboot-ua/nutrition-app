import { Router } from 'express'
import {
  follow,
  unfollow,
  getFollowersList,
  getFollowingList,
  checkFollow,
} from '../controllers/follow.controller'
import { verifyToken } from '../middleware/auth.middleware'

const router = Router()

// Всі маршрути потребують автентифікації
router.use(verifyToken)

/**
 * @swagger
 * /api/follow/{followingId}:
 *   post:
 *     summary: Follow a user
 *     tags: [Follow]
 *     security:
 *       - bearerAuth:
 *           []
 *     parameters:
 *       - in: path
 *         name: followingId
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the user to follow
 *     responses:
 *       200:
 *         description: Successfully followed the user
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: User not found
 *       409:
 *         description: Already following the user
 */
router.post('/:followingId', follow)

/**
 * @swagger
 * /api/follow/{followingId}:
 *   delete:
 *     summary: Unfollow a user
 *     tags: [Follow]
 *     security:
 *       - bearerAuth:
 *           []
 *     parameters:
 *       - in: path
 *         name: followingId
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the user to unfollow
 *     responses:
 *       200:
 *         description: Successfully unfollowed the user
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Not following the user
 */
router.delete('/:followingId', unfollow)

/**
 * @swagger
 * /api/follow/followers:
 *   get:
 *     summary: Get the list of users following the current user
 *     tags: [Follow]
 *     security:
 *       - bearerAuth:
 *           []
 *     responses:
 *       200:
 *         description: A list of follower users
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object # Consider defining a specific User schema later
 *       401:
 *         description: Unauthorized
 */
router.get('/followers', getFollowersList)

/**
 * @swagger
 * /api/follow/following:
 *   get:
 *     summary: Get the list of users the current user is following
 *     tags: [Follow]
 *     security:
 *       - bearerAuth:
 *           []
 *     responses:
 *       200:
 *         description: A list of users the current user is following
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object # Consider defining a specific User schema later
 *       401:
 *         description: Unauthorized
 */
router.get('/following', getFollowingList)

/**
 * @swagger
 * /api/follow/check/{followingId}:
 *   get:
 *     summary: Check if the current user is following a specific user
 *     tags: [Follow]
 *     security:
 *       - bearerAuth:
 *           []
 *     parameters:
 *       - in: path
 *         name: followingId
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the user to check following status for
 *     responses:
 *       200:
 *         description: Following status checked successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 isFollowing:
 *                   type: boolean
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: User not found
 */
router.get('/check/:followingId', checkFollow)

export default router 