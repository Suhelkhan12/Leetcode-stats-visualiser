"use client";
import { startTransition, useEffect, useState } from "react";
import LeetCodeStatsCard from "../leetcode-card/leetcode-card";
import InputForm from "./input-form";
import { Loader } from "lucide-react";
import { UserData } from "@/lib/types";
import { Button } from "../ui/button";

const CardGenerator = () => {
  const [username, setUsername] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [userData, setUserData] = useState<UserData | null>(null);

  // Fetch user data when the username is updated
  useEffect(() => {
    if (username) {
      const fetchUserData = async () => {
        setLoading(true);
        try {
          const response = await fetch(
            `/api/getUserData/?username=${username}`,
            {
              method: "POST",
            }
          );
          if (response.ok) {
            const data = await response.json();
            // console.log(data);
            const { matchedUser, userContestRanking } = data;
            const username = matchedUser.username;
            const profilePicture = matchedUser.profile.userAvatar;
            const ranking = matchedUser.profile.ranking;

            const badges = matchedUser.badges.length;
            const acSubmissionNum =
              matchedUser.submitStatsGlobal.acSubmissionNum;
            const [
              allSubmissions,
              easySubmissions,
              mediumSubmissions,
              hardSubmissions,
            ] = acSubmissionNum;
            const totalSolved = allSubmissions.count;
            const easySolved = easySubmissions.count;
            const mediumSolved = mediumSubmissions.count;
            const hardSolved = hardSubmissions.count;

            // Destructure the values into separate variables
            // Declare the variables outside of the if block

            // Check if `userContestRanking` exists and destructure the values
            const userContestRankingData = userContestRanking
              ? userContestRanking
              : null; // If `userContestRanking` is null, set as null

            const submissionDistribution = matchedUser.languageProblemCount.map(
              (item: { languageName: string; problemsSolved: string }) => ({
                language: item.languageName,
                count: item.problemsSolved,
              })
            );

            setUserData({
              username,
              profilePicture,
              ranking,
              totalSolved,
              easySolved,
              mediumSolved,
              hardSolved,
              submissionDistribution,
              badges,
              userContestRanking: userContestRankingData,
            });

            console.log({
              userContestRankingData,
            });
          } else {
            console.error("Error fetching user data");
          }
        } catch (error) {
          console.error("Error fetching user data:", error);
        } finally {
          setLoading(false);
        }
      };
      startTransition(() => {
        fetchUserData();
      });
      setUsername(null);
    }
  }, [username]);

  return (
    <section aria-labelledby="generate-heading" className="mt-20">
      <h2
        id="generate-heading"
        className="text-2xl md:text-3xl font-bold mb-4 text-center"
      >
        Generate Your Stats Card
      </h2>

      {!userData ? (
        <InputForm setUsername={setUsername} />
      ) : (
        <div className="flex items-center justify-center">
          <Button onClick={() => setUserData(null)}>Generate new</Button>
        </div>
      )}
      {loading && !userData ? (
        <div className=" h-40 flex items-center justify-center gap-4">
          <Loader className=" animate-spin" /> Fetching your details
        </div>
      ) : (
        <LeetCodeStatsCard data={userData} />
      )}
    </section>
  );
};

export default CardGenerator;
