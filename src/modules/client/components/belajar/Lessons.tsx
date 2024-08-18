import { useRouter } from "next/router";
import React, { FC } from "react";

import { cn } from "@/common/utils";

import useSubBabList from "../../hooks/useSubBab";

type LessonsProps = {
  babNumber: number;
};

const Lessons: FC<LessonsProps> = ({ babNumber }) => {
  const { subBabList } = useSubBabList({ babNumber });

  return (
    <>
      {subBabList?.map((subBab, index) => {
        return (
          <section
            id={subBab.id}
            key={subBab.id}
            className="w-full px-10 flex flex-col items-center"
          >
            {index !== 0 ? (
              <div className="flex w-full items-center my-8">
                <hr className="flex-1 leading-[24px]" />
                <h1 className="leading-[24px] mx-3 text-neutral-500">
                  {subBab?.name}
                </h1>
                <hr className="flex-1 leading-[24px]" />
              </div>
            ) : null}

            {subBab.lesson.map((item, index) => {
              const itemPerSide = 2;
              const spacePerItem = 40;
              const left =
                index % (itemPerSide * 2) < itemPerSide
                  ? (index % itemPerSide) * spacePerItem
                  : (itemPerSide - (index % itemPerSide)) * spacePerItem;

              return (
                <ProgressItem
                  key={item.id}
                  className="last:!mb-0"
                  href={`/belajar/${babNumber}/${subBab.id}/${item.id}`}
                  starCount={3}
                  style={{
                    marginBottom: "30px",
                    left: `${left}px`,
                  }}
                  disabled={false}
                />
              );
            })}
          </section>
        );
      })}
    </>
  );
};

const ProgressItem = ({
  starCount,
  href,
  style,
  disabled,
  className,
}: {
  starCount: number;
  href: string;
  style: React.CSSProperties;
  disabled: boolean;
  className: string;
}) => {
  const router = useRouter();

  return (
    <button
      className={cn("group relative items-center flex flex-col", className, {
        "cursor-pointer": !disabled,
        "cursor-not-allowed": disabled,
      })}
      style={style}
      disabled={disabled}
      onClick={() => {
        router.push(href);
      }}
    >
      <div
        className={cn(
          "transform duration-100 w-[60px] h-[56px] rounded-[100%]",
          // "group-hover:h-[52px]",
          {
            "bg-primary-dark1": !disabled,
            "bg-[#cbcbcb]": disabled,
          }
        )}
      >
        <div
          className={cn(
            "w-full transform duration-100 flex items-center justify-center rounded-[100%] h-[48px] bg-primary",
            "group-hover:h-[44px]",
            "group-active:h-[50px]",
            {
              "bg-[#e0e0e0]": disabled,
            }
          )}
        >
          <StarIcon
            className="transform duration-100 group-hover:scale-y-[.85] size-[25px] scale-y-90"
            filled={!disabled}
          />
        </div>
      </div>
      <div className="flex items-center gap-x-2 -mb-1">
        <StarIcon className="size-[25px] -mt-3.5" filled={starCount > 0} />
        <StarIcon className="size-[25px] mt-0.5" filled={starCount > 1} />
        <StarIcon className="size-[25px] -mt-3.5" filled={starCount > 3} />
      </div>
    </button>
  );
};

const StarIcon = ({
  filled,
  ...props
}: React.JSX.IntrinsicElements["svg"] & {
  filled?: boolean;
}) => {
  return (
    <svg
      width="46"
      height="44"
      viewBox="0 0 46 44"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      {filled ? (
        <>
          <path
            d="M20.3146 1.51531L14.7596 12.7785L2.33094 14.5905C0.102124 14.9138 -0.791105 17.6615 0.825214 19.2353L9.81705 27.9974L7.69032 40.375C7.30751 42.6124 9.66393 44.2882 11.6375 43.2419L22.7561 37.3976L33.8747 43.2419C35.8483 44.2797 38.2047 42.6124 37.8219 40.375L35.6952 27.9974L44.687 19.2353C46.3033 17.6615 45.4101 14.9138 43.1813 14.5905L30.7526 12.7785L25.1976 1.51531C24.2023 -0.492324 21.3184 -0.517845 20.3146 1.51531Z"
            fill="url(#paint0_linear_174_293)"
          />
          <defs>
            <linearGradient
              id="paint0_linear_174_293"
              x1="22.7561"
              y1="0"
              x2="22.7561"
              y2="43.5609"
              gradientUnits="userSpaceOnUse"
            >
              <stop stopColor="#ECFF34" />
              <stop offset="1" stopColor="#FFB619" />
            </linearGradient>
          </defs>
        </>
      ) : (
        <>
          <mask id="path-1-inside-1_174_294" fill="white">
            <path d="M20.3146 1.51531L14.7596 12.7785L2.33094 14.5905C0.102124 14.9138 -0.791105 17.6615 0.825214 19.2353L9.81705 27.9974L7.69032 40.375C7.30751 42.6124 9.66393 44.2882 11.6375 43.2419L22.7561 37.3976L33.8747 43.2419C35.8483 44.2797 38.2047 42.6124 37.8219 40.375L35.6952 27.9974L44.687 19.2353C46.3033 17.6615 45.4101 14.9138 43.1813 14.5905L30.7526 12.7785L25.1976 1.51531C24.2023 -0.492324 21.3184 -0.517845 20.3146 1.51531Z" />
          </mask>
          <path
            d="M20.3146 1.51531L14.7596 12.7785L2.33094 14.5905C0.102124 14.9138 -0.791105 17.6615 0.825214 19.2353L9.81705 27.9974L7.69032 40.375C7.30751 42.6124 9.66393 44.2882 11.6375 43.2419L22.7561 37.3976L33.8747 43.2419C35.8483 44.2797 38.2047 42.6124 37.8219 40.375L35.6952 27.9974L44.687 19.2353C46.3033 17.6615 45.4101 14.9138 43.1813 14.5905L30.7526 12.7785L25.1976 1.51531C24.2023 -0.492324 21.3184 -0.517845 20.3146 1.51531Z"
            fill="white"
            stroke="#F3BA8C"
            strokeWidth="2"
            mask="url(#path-1-inside-1_174_294)"
          />
        </>
      )}
    </svg>
  );
};

export default Lessons;
