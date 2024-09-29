'use client';
import { featureList } from '@/lib/featureList';
import { featureContainerVariants, featureItemVariants } from '@/lib/styles';
import { motion } from 'framer-motion';

const Feature = () => {
  return (
    <motion.section
      className="w-full py-12 md:py-24 lg:py-32"
      initial="hidden"
      animate="visible"
      variants={featureContainerVariants}
    >
      <div className="container px-4 md:px-6">
        <motion.h2
          className="text-3xl font-bold tracking-tighter sm:text-5xl text-center mb-12"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
        >
          Why Choose Us
        </motion.h2>
        <motion.div
          className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3"
          variants={featureContainerVariants}
        >
          {featureList.map((feature, index) => (
            <motion.div
              key={index}
              className="flex flex-col items-center text-center"
              variants={featureItemVariants}
            >
              <div className="mb-4 rounded-full bg-purple-100 p-4 dark:bg-purple-900">
                <svg
                  className=" h-6 w-6 text-purple-600 dark:text-purple-400"
                  fill="none"
                  height="24"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                  width="24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <polyline points="20 6 9 17 4 12" />
                </svg>
              </div>
              <h3 className="mb-2 text-xl font-bold">{feature.title}</h3>
              <p className="text-sm text-muted-foreground">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </motion.section>
  );
};

export default Feature;
