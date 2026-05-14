import React, { Suspense, lazy, useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FaGamepad,
  FaCoins,
  FaStopwatch,
  FaRedo,
  FaTrophy,
  FaSatelliteDish,
} from "react-icons/fa";
import { useMood } from "../../context/MoodContext";

const GardenScene = lazy(() => import("./GardenScene"));

const START_TIME = 100; // seconds
const TOTAL_COINS = 12;

/* hot / cold radar bands based on distance to nearest hidden coin */
function getHeat(radar) {
  if (radar > 45) return { label: "Freezing", color: "#60a5fa", pct: 8 };
  if (radar > 30) return { label: "Cold", color: "#38bdf8", pct: 28 };
  if (radar > 18) return { label: "Warm", color: "#fbbf24", pct: 52 };
  if (radar > 10) return { label: "Hot", color: "#fb923c", pct: 78 };
  return { label: "Burning!", color: "#ef4444", pct: 100 };
}

function Loader({ mood }) {
  return (
    <div
      className="absolute inset-0 flex items-center justify-center"
      style={{ background: "#cfe8f5" }}
    >
      <div className="flex flex-col items-center gap-5">
        <motion.div
          className="w-14 h-14 rounded-2xl flex items-center justify-center"
          style={{
            background: `linear-gradient(135deg, ${mood.colors.primary}, ${mood.colors.secondary})`,
            boxShadow: `0 12px 36px ${mood.colors.primary}50`,
          }}
          animate={{ rotate: [0, 360], scale: [1, 1.08, 1] }}
          transition={{ duration: 1.4, repeat: Infinity, ease: "easeInOut" }}
        >
          <FaGamepad className="text-white text-2xl" />
        </motion.div>
        <p
          className="text-xs uppercase tracking-[0.4em] font-bold"
          style={{ color: "#1e3a4f" }}
        >
          Growing the garden…
        </p>
      </div>
    </div>
  );
}

const KEY_CAP = ({ children, wide }) => (
  <span
    className={`inline-flex items-center justify-center ${
      wide ? "px-2.5" : "min-w-[1.6rem]"
    } h-6 rounded-md text-[10px] font-black`}
    style={{
      background: "rgba(255,255,255,0.12)",
      border: "1px solid rgba(255,255,255,0.25)",
      color: "#fff",
    }}
  >
    {children}
  </span>
);

const PANEL = {
  background: "rgba(10,12,24,0.62)",
  backdropFilter: "blur(12px)",
  boxShadow: "0 12px 40px rgba(0,0,0,0.45)",
};

const Game = () => {
  const { mood } = useMood();
  const [gameKey, setGameKey] = useState(0);
  const [score, setScore] = useState(0);
  const [total, setTotal] = useState(TOTAL_COINS);
  const [radar, setRadar] = useState(999);
  const [time, setTime] = useState(START_TIME);
  const [hitInfo, setHitInfo] = useState(null);

  const won = score > 0 && score === total;
  const lost = time <= 0 && !won;
  const over = won || lost;

  // countdown — stops on win/lose
  useEffect(() => {
    if (over) return undefined;
    const iv = setInterval(() => setTime((t) => Math.max(0, t - 1)), 1000);
    return () => clearInterval(iv);
  }, [over]);

  // clear the snake-hit flash after it plays
  useEffect(() => {
    if (!hitInfo) return undefined;
    const t = setTimeout(() => setHitInfo(null), 1300);
    return () => clearTimeout(t);
  }, [hitInfo]);

  const retry = () => {
    setScore(0);
    setRadar(999);
    setTime(START_TIME);
    setHitInfo(null);
    setGameKey((k) => k + 1);
  };

  const mm = Math.floor(time / 60);
  const ss = String(time % 60).padStart(2, "0");
  const lowTime = time <= 15;
  const heat = getHeat(radar);

  return (
    <div className="relative w-full h-screen overflow-hidden">
      {/* 3D scene */}
      <Suspense fallback={<Loader mood={mood} />}>
        <GardenScene
          key={gameKey}
          active={!over}
          primary={mood.colors.primary}
          secondary={mood.colors.secondary}
          onCollect={(collected, allCoins) => {
            setScore(collected);
            if (allCoins) setTotal(allCoins);
          }}
          onRadar={(d) => setRadar(d)}
          onSnakeHit={(lost) => setHitInfo({ id: Date.now(), lost })}
        />
      </Suspense>

      {/* ---- Instruction panel — top centre ---- */}
      <motion.div
        initial={{ opacity: 0, y: -24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4, type: "spring", stiffness: 90, damping: 15 }}
        className="absolute top-3 sm:top-5 left-1/2 -translate-x-1/2 z-10 px-4 sm:px-5 py-2.5 sm:py-3 rounded-2xl flex items-center gap-3 sm:gap-4"
        style={{ ...PANEL, border: `1px solid ${mood.colors.primary}55` }}
      >
        <div
          className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl flex items-center justify-center flex-shrink-0"
          style={{
            background: `linear-gradient(135deg, ${mood.colors.primary}, ${mood.colors.secondary})`,
          }}
        >
          <FaGamepad className="text-white text-base sm:text-lg" />
        </div>
        <div className="leading-tight">
          <p
            className="text-[9px] sm:text-[10px] uppercase tracking-[0.35em] font-bold"
            style={{ color: mood.colors.primary }}
          >
            Coin Hunt
          </p>
          <div className="flex items-center gap-1.5 mt-1 flex-wrap">
            <span className="flex items-center gap-1">
              <KEY_CAP>W</KEY_CAP>
              <KEY_CAP>A</KEY_CAP>
              <KEY_CAP>S</KEY_CAP>
              <KEY_CAP>D</KEY_CAP>
            </span>
            <span className="text-white text-[11px] sm:text-xs font-semibold">
              move
            </span>
            <span className="text-white/30">·</span>
            <KEY_CAP wide>SPACE</KEY_CAP>
            <span className="text-white text-[11px] sm:text-xs font-semibold">
              jump
            </span>
          </div>
        </div>
      </motion.div>

      {/* ---- Timer — top left ---- */}
      <motion.div
        initial={{ opacity: 0, x: -24 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.5, type: "spring", stiffness: 90, damping: 15 }}
        className="absolute top-3 sm:top-5 left-3 sm:left-5 z-10 px-3.5 py-2 rounded-2xl flex items-center gap-2.5"
        style={{
          ...PANEL,
          border: `1px solid ${lowTime ? "#ef4444" : mood.colors.primary}66`,
        }}
      >
        <motion.div
          style={{ color: lowTime ? "#ef4444" : mood.colors.primary }}
          animate={lowTime ? { scale: [1, 1.18, 1] } : {}}
          transition={{ duration: 0.6, repeat: lowTime ? Infinity : 0 }}
        >
          <FaStopwatch className="text-lg" />
        </motion.div>
        <span
          className="text-lg font-black tabular-nums"
          style={{ color: lowTime ? "#ef4444" : "#fff" }}
        >
          {mm}:{ss}
        </span>
      </motion.div>

      {/* ---- Coin score — top right (below mood switcher) ---- */}
      <motion.div
        initial={{ opacity: 0, x: 24 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.55, type: "spring", stiffness: 90, damping: 15 }}
        className="absolute top-16 sm:top-20 right-3 sm:right-4 z-10 px-3.5 py-2 rounded-2xl flex items-center gap-2.5"
        style={{ ...PANEL, border: `1px solid ${mood.colors.primary}55` }}
      >
        <motion.div
          animate={{ rotateY: [0, 360] }}
          transition={{ duration: 2.4, repeat: Infinity, ease: "linear" }}
          style={{ color: "#fcd34d" }}
        >
          <FaCoins className="text-lg" />
        </motion.div>
        <div className="flex items-baseline gap-1">
          <AnimatePresence mode="popLayout">
            <motion.span
              key={score}
              initial={{ y: 10, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -10, opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="text-lg font-black text-white"
            >
              {score}
            </motion.span>
          </AnimatePresence>
          <span className="text-xs font-bold text-white/40">/ {total}</span>
        </div>
      </motion.div>

      {/* ---- Hot / Cold radar — bottom centre ---- */}
      {!over && (
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.65, type: "spring", stiffness: 90, damping: 15 }}
          className="absolute bottom-5 sm:bottom-7 left-1/2 -translate-x-1/2 z-10 px-4 py-2.5 rounded-2xl w-[min(82vw,340px)]"
          style={{ ...PANEL, border: `1px solid ${heat.color}66` }}
        >
          <div className="flex items-center gap-2.5 mb-2">
            <motion.div
              style={{ color: heat.color }}
              animate={
                heat.label === "Burning!"
                  ? { scale: [1, 1.25, 1] }
                  : { rotate: [0, 12, -12, 0] }
              }
              transition={{
                duration: heat.label === "Burning!" ? 0.5 : 2.4,
                repeat: Infinity,
              }}
            >
              <FaSatelliteDish className="text-base" />
            </motion.div>
            <span className="text-[10px] uppercase tracking-[0.3em] font-bold text-white/55">
              Coin Radar
            </span>
            <span
              className="ml-auto text-sm font-black uppercase tracking-wider"
              style={{ color: heat.color }}
            >
              {heat.label}
            </span>
          </div>
          {/* heat bar */}
          <div
            className="h-2.5 rounded-full overflow-hidden"
            style={{ background: "rgba(255,255,255,0.1)" }}
          >
            <motion.div
              className="h-full rounded-full"
              style={{ background: heat.color }}
              animate={{ width: `${heat.pct}%` }}
              transition={{ type: "spring", stiffness: 120, damping: 20 }}
            />
          </div>
          <p className="text-[9px] uppercase tracking-[0.25em] text-white/35 mt-1.5 text-center">
            Coins are hidden — snakes reset them, jump to dodge
          </p>
        </motion.div>
      )}

      {/* ---- Snake-hit flash ---- */}
      <AnimatePresence>
        {hitInfo && (
          <motion.div
            key={hitInfo.id}
            className="absolute inset-0 z-30 pointer-events-none flex items-start justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 1, 1, 0] }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.3, times: [0, 0.12, 0.7, 1] }}
          >
            {/* red vignette */}
            <div
              className="absolute inset-0"
              style={{
                background:
                  "radial-gradient(ellipse at center, transparent 32%, rgba(220,38,38,0.5) 100%)",
              }}
            />
            {/* message */}
            <motion.div
              initial={{ scale: 0.7, y: -10 }}
              animate={{ scale: 1, y: 0 }}
              transition={{ type: "spring", stiffness: 200, damping: 14 }}
              className="relative mt-[28vh] px-5 py-3 rounded-2xl text-center"
              style={{
                background: "rgba(120,12,12,0.88)",
                border: "1px solid rgba(248,113,113,0.6)",
                backdropFilter: "blur(8px)",
                boxShadow: "0 12px 40px rgba(220,38,38,0.5)",
              }}
            >
              <p className="text-white font-black text-base sm:text-lg">
                Snake bit you!
              </p>
              <p className="text-red-200/80 text-[10px] uppercase tracking-[0.3em] mt-0.5">
                {hitInfo.lost > 0
                  ? `Lost ${hitInfo.lost} coin${hitInfo.lost > 1 ? "s" : ""}`
                  : "Watch the snakes"}
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ---- Win / Lose overlay ---- */}
      <AnimatePresence>
        {over && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 z-20 flex items-center justify-center px-4"
            style={{ background: "rgba(6,8,16,0.55)", backdropFilter: "blur(6px)" }}
          >
            <motion.div
              initial={{ scale: 0.82, y: 30, opacity: 0 }}
              animate={{ scale: 1, y: 0, opacity: 1 }}
              transition={{ type: "spring", stiffness: 130, damping: 15 }}
              className="relative text-center px-8 sm:px-12 py-9 sm:py-11 rounded-3xl max-w-md w-full"
              style={{
                ...PANEL,
                border: `1px solid ${won ? "#22c55e" : "#ef4444"}66`,
              }}
            >
              <motion.div
                className="w-16 h-16 mx-auto mb-5 rounded-2xl flex items-center justify-center"
                style={{
                  background: won
                    ? `linear-gradient(135deg, ${mood.colors.primary}, ${mood.colors.secondary})`
                    : "linear-gradient(135deg, #ef4444, #b91c1c)",
                  boxShadow: `0 14px 40px ${won ? mood.colors.primary : "#ef4444"}55`,
                }}
                animate={won ? { rotate: [0, -10, 10, 0] } : {}}
                transition={{ duration: 1.4, repeat: won ? Infinity : 0 }}
              >
                {won ? (
                  <FaTrophy className="text-white text-2xl" />
                ) : (
                  <FaStopwatch className="text-white text-2xl" />
                )}
              </motion.div>

              <h2
                className="text-2xl sm:text-3xl font-black text-white mb-2"
                style={{ letterSpacing: "-0.02em" }}
              >
                {won ? "Garden Champion!" : "Time's Up!"}
              </h2>
              <p
                className="text-sm mb-7"
                style={{ color: "rgba(255,255,255,0.6)" }}
              >
                {won
                  ? `All ${total} coins found with ${mm}:${ss} to spare.`
                  : `You found ${score} of ${total} hidden coins.`}
              </p>

              <button
                onClick={retry}
                className="inline-flex items-center gap-2.5 px-7 py-3.5 rounded-xl font-bold text-white text-sm uppercase tracking-wider transition-transform hover:-translate-y-0.5"
                style={{
                  background: `linear-gradient(135deg, ${mood.colors.primary}, ${mood.colors.secondary})`,
                  boxShadow: `0 12px 32px ${mood.colors.primary}50`,
                }}
              >
                <FaRedo /> Play Again
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Mobile note */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.9 }}
        className="sm:hidden absolute bottom-28 left-1/2 -translate-x-1/2 z-10 text-center text-[10px] uppercase tracking-[0.3em] px-4 py-1.5 rounded-full"
        style={{
          background: "rgba(10,12,24,0.6)",
          border: "1px solid rgba(255,255,255,0.15)",
          color: "rgba(255,255,255,0.7)",
          backdropFilter: "blur(8px)",
        }}
      >
        Best played on a keyboard
      </motion.p>
    </div>
  );
};

export default Game;
