"use client";

import React, { useEffect, useState } from "react";
import FeedLayout from "@/app/feed/FeedLayout";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import APIs from "@/APIs";
import { AudioBooks } from "@/components/AudioBooks";

const Home = () => {
  const [voting, setVoting] = useState(false);
  const [loading, setLoading] = useState(false);
  const [audioBooks, setAudioBooks] = useState([]);
  const { userId } = useSelector((state) => state.user);

  useEffect(() => {
    if (userId) getAudioBooks(userId);
  }, [userId])

  const getAudioBooks = (userId) => {
    setLoading(true);
    APIs.getAudioBooks({ user_id: userId })
      .then(resp => {
        console.log(resp)
        setLoading(false)
        setAudioBooks(resp?.data)
      })
      .catch((err) => {
        toast.error(err?.message || 'An error occured while fetching audiobooks.');
        setLoading(false)
      });
  }

  const onVote = (audioBookId) => {
    setVoting(true);
    APIs.voteAudioBook({ audiobook_id: audioBookId, user_id: userId })
      .then(resp => {
        setVoting(false)
        const { success, message } = resp.data;
        if (!success) {
          toast.error(message || 'An error occured while submitting vote.');
        }

        const newAudioBooks = audioBooks.map((item) => {
          if (item.id === audioBookId) {
            return {...item, user_voted: true, vote_count: Number(item.vote_count) + 1};
          }
          return item;
        });

        setAudioBooks(newAudioBooks);
      })
      .catch((err) => {
        toast.error(err?.message || 'An error occured while submitting vote.');
        setVoting(false)
      });
  }

  return (
    <FeedLayout>
      <h1 className="text-center text-balancen text-3xl lg:text-5xl font-bold tracking-tight text-gray-900 mx-auto">
        Vote for your favorite AudioBooks
      </h1>
      <AudioBooks loading={loading} voting={voting} audioBooks={audioBooks} onVote={onVote} />
    </FeedLayout>);
};

export default Home;
