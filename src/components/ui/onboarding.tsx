"use client";
import {
  Dispatch,
  FC,
  PropsWithChildren,
  SetStateAction,
  useEffect,
  useState,
} from "react";
import { useAccount } from "../providers/account";
import { useUser } from "@auth0/nextjs-auth0/client";
import { AnimatePresence, motion } from "framer-motion";
import { User } from "@prisma/client";
import Image from "next/image";
import { Formik } from "formik";
import { createUserSchema } from "@/schema/user";
import { trpc } from "@/trpc/client";

const FormSlide: FC<PropsWithChildren> = ({ children }) => (
  <motion.div
    initial="initial"
    animate="animate"
    exit="exit"
    variants={{
      initial: { x: "100vw" },
      animate: { x: 0 },
      exit: { x: "-100vw" },
    }}
    className="pt-10"
    transition={{ duration: 1, type: "spring" }}
  >
    {children}
  </motion.div>
);

const slides: FC<{
  setSlide: Dispatch<SetStateAction<number>>;
  setForm: Dispatch<SetStateAction<Partial<User>>>;
}>[] = [
  ({ setSlide }) => {
    useEffect(() => {
      const timeout = setTimeout(() => setSlide(1), 5000);

      return () => clearTimeout(timeout);
    }, []);

    return (
      <motion.div initial="initial" animate="animate" exit="exit">
        <motion.h1
          className="my-4"
          variants={{
            initial: { x: "-100vw" },
            animate: { x: 0 },
            exit: { x: "100vw" },
          }}
          transition={{ duration: 1, type: "spring" }}
        >
          Welcome to Bark
        </motion.h1>

        <motion.h6
          variants={{
            initial: {
              y: "100px",
              opacity: 0,
            },
            animate: {
              y: 0,
              opacity: 1,
            },
            exit: {
              x: "-50%",
              opacity: 0,
              transition: { delay: 0.3, duration: 1 },
            },
          }}
          transition={{ duration: 1, delay: 0.5, type: "spring" }}
        >
          A social platform for you to yap and bark with your friends
        </motion.h6>
        <motion.h6
          variants={{
            initial: {
              y: "100px",
              opacity: 0,
            },
            animate: {
              y: 0,
              opacity: 1,
            },
            exit: {
              x: "50%",
              opacity: 0,
              transition: { delay: 0.6, duration: 1 },
            },
          }}
          transition={{ duration: 1, delay: 1, type: "spring" }}
        >
          Share whatever you want, whenever you want
        </motion.h6>
        <motion.div
          variants={{
            initial: {
              y: "100px",
              opacity: 0,
            },
            animate: {
              y: 0,
              opacity: 1,
            },
            exit: {
              x: "-50%",
              opacity: 0,
              transition: { delay: 0.9, duration: 1 },
            },
          }}
          transition={{ duration: 1, delay: 1.5, type: "spring" }}
          className="w-full flex justify-center"
        >
          <Image src="/icon.png" width={200} height={200} alt="Bark Logo" />
        </motion.div>

        <motion.h4
          variants={{
            initial: {
              y: "100px",
              opacity: 0,
            },
            animate: {
              y: 0,
              opacity: 1,
            },
            exit: {
              x: "50%",
              opacity: 0,
              transition: { delay: 1.2, duration: 1 },
            },
          }}
          transition={{ duration: 1, delay: 2, type: "spring" }}
          className="mt-4"
        >
          Let's Get Started.
        </motion.h4>
      </motion.div>
    );
  },

  ({ setSlide }) => {
    return (
      <FormSlide>
        <h1>Your Profile</h1>
        <button onClick={() => setSlide(2)} className="px-2">
          Next
        </button>
      </FormSlide>
    );
  },
  ({ setSlide }) => {
    return (
      <FormSlide>
        <h1>Personal Details</h1>
        <input type="text" placeholder="Username" />
        <button onClick={() => setSlide(3)} className="px-2">
          Next
        </button>
      </FormSlide>
    );
  },
];

const Progress: FC<{ slide: number }> = ({ slide }) => {
  if (!slide) return null;

  return (
    <motion.div
      initial="initial"
      animate="animate"
      variants={{
        // top them come down
        initial: { y: "-40px" },
        animate: { y: 0 },
      }}
      transition={{ delay: 2, duration: 0.4 }}
      className="p-4 absolute top-0 left-0 w-full"
    >
      <div className=" h-2 w-full bg-gray-300 dark:bg-zinc-700 rounded-full">
        <div
          className="h-full w-full bg-primary rounded-full transition-all duration-200"
          style={{ width: `${((slide - 1) / (slides.length - 2)) * 100}%` }}
        />
      </div>
    </motion.div>
  );
};

export const Onboarding: FC = () => {
  const { data } = useAccount();
  const { isLoading, user } = useUser();
  const [slide, setSlide] = useState(0);
  const [form, setForm] = useState<Partial<User>>({});

  const formSubmit = trpc.createAccount.useMutation();

  const Slide = slides[slide];

  if (isLoading || !user || data) return null;

  useEffect(() => {}, [formSubmit]);

  return (
    <div className="z-40 fixed top-0 left-0 w-[100dvw] h-[100dvh] bg-page text-center">
      <Formik
        validationSchema={createUserSchema}
        initialValues={{
          username: "",
          profilePic: undefined as string | undefined,
          bio: "",
          banner: undefined as string | undefined,
          name: "",
          birthday: new Date(),
        }}
        onSubmit={(values) => {
          formSubmit.mutate(values);
        }}
      >
        {" "}
        <AnimatePresence>
          <Progress slide={slide} key="progress" />
        </AnimatePresence>
        <AnimatePresence mode="wait">
          <Slide setSlide={setSlide} setForm={setForm} key={slide} />
        </AnimatePresence>
      </Formik>
    </div>
  );
};
