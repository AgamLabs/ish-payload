"use client";
import React, { useEffect, useState } from "react";

const Promotion = () => {
  const [time, setTime] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  const targetDate = new Date();
  targetDate.setDate(targetDate.getDate() + 3);

  useEffect(() => {
    const timerInterval = setInterval(() => {
      const currentTime = new Date();
      const timeDifference = Math.max(
        Number(targetDate) - Number(currentTime),
        0
      );

      const days = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
      const hours = Math.floor(
        (timeDifference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
      );
      const minutes = Math.floor(
        (timeDifference % (1000 * 60 * 60)) / (1000 * 60)
      );
      const seconds = Math.floor((timeDifference % (1000 * 60)) / 1000);

      setTime({ days, hours, minutes, seconds });

      if (timeDifference === 0) {
        clearInterval(timerInterval);
        // You can add code here to handle what happens when the target date is reached.
      }
    }, 1000);

    return () => {
      clearInterval(timerInterval); // Cleanup the interval when the component unmounts.
    };
  }, []);

  return (
    <section className="grid grid-cols-[50%_1fr] gap-7 mb-7 sm:grid-cols-1">
      <div className="flex flex-col justify-center gap-7">
        <h3 className="font-normal">Deals of the month</h3>
        <p>
          Get ready for a shopping experience like never before with our Deals
          of the Month! Every purchase comes with exclusive perks and offers,
          making this month a celebration of savvy choices and amazing deals.
          Don't miss out! 🎁🛒
        </p>
        <ul className="grid gap-5 grid-cols-[repeat(4,100px)] lg:grid-cols-2">
          <StatBox label="Days" value={time.days} />
          <StatBox label="Hours" value={time.hours} />
          <StatBox label="Minutes" value={time.minutes} />
          <StatBox label="Seconds" value={time.seconds} />
        </ul>
      </div>
    </section>
  );
};

const StatBox = ({ label, value }: { label: string; value: number }) => (
  <li className="rounded-lg border border-[var(--color-dark-60)] p-4 min-w-[100px] w-full text-center">
    <h4 className="font-bold">{value}</h4>
    <p>{label}</p>
  </li>
);

export default Promotion;
