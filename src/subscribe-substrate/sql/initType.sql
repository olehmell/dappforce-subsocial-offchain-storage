CREATE TYPE df.action AS ENUM (
'BlogCreated',
'BlogUpdated',
'FollowBlog',
'BlogUnfollowed',
'FollowAccount',
'UnfollowAccount',
'PostCreated',
'PostUpdated',
'CommentCreated',
'CommentUpdated',
'PostReactionCreated',
'PostReactionUpdated',
'CommentReactionCreated',
'CommentReactionUpdated')