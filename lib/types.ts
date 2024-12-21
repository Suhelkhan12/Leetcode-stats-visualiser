type Submission = {
  language: string;
  count: number;
};

type UserContestRanking = {
  attendedContestsCount: number;
  rating: number;
  globalRanking: number;
  totalParticipants: number;
  topPercentage: number;
};

export type UserData = {
  username: string;
  profilePicture: string;
  ranking: number;
  totalSolved: number;
  easySolved: number;
  mediumSolved: number;
  hardSolved: number;
  submissionDistribution: Submission[];
  userContestRanking: UserContestRanking;
  badges: number;
};
