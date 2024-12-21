import { gql, GraphQLClient } from "graphql-request";
import { NextRequest } from "next/server";

export async function POST(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const username = searchParams.get("username");

  if (!username) {
    return new Response("Username is required", { status: 400 });
  }
  // Define the GraphQL query
  const query = gql`
    query getUserProfileAndContestRankingWithLanguageStats($username: String!) {
      matchedUser(username: $username) {
        username
        profile {
          ranking
          userAvatar
        }
        submitStatsGlobal {
          acSubmissionNum {
            difficulty
            count
            submissions
          }
        }
        languageProblemCount {
          languageName
          problemsSolved
        }
        badges {
          id
          displayName
          icon
          creationDate
        }
        upcomingBadges {
          name
          icon
        }
        activeBadge {
          id
          displayName
          icon
          creationDate
        }
      }
      userContestRanking(username: $username) {
        attendedContestsCount
        rating
        globalRanking
        totalParticipants
        topPercentage
        badge {
          name
        }
      }
    }
  `;

  // Set the endpoint URL for your GraphQL API (replace with your API endpoint)
  const endpoint = "https://leetcode.com/graphql";

  // Create an instance of the GraphQL client
  const client = new GraphQLClient(endpoint);

  try {
    // Send the request
    const data = await client.request(query, { username });

    // Return the response data
    return new Response(JSON.stringify(data), { status: 200 });
  } catch (error) {
    console.error(error);
    return new Response("Error fetching data", { status: 500 });
  }
}
