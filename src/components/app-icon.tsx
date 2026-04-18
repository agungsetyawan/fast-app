import { type FC, type SVGProps, useId } from "react";

export const AppIcon: FC<SVGProps<SVGSVGElement>> = (props) => {
  const id = useId().replace(/:/g, "");
  return (
    <svg
      aria-label="App Icon"
      xmlns="http://www.w3.org/2000/svg"
      xmlSpace="preserve"
      style={{
        fillRule: "evenodd",
        clipRule: "evenodd",
        strokeLinecap: "round",
        strokeLinejoin: "round",
        strokeMiterlimit: 1.5,
      }}
      viewBox="0 0 268 268"
      {...props}
    >
      <path
        fill="none"
        d="M40 64h247v263H40z"
        style={{
          fill: "#ebebeb",
          fillOpacity: 0,
          stroke: "#64ff00",
          strokeOpacity: 0,
          strokeWidth: ".95px",
        }}
        transform="matrix(1.07962 0 0 1.01394 -42.685 -64.392)"
      />
      <path
        d="M-.283-.226q0 .028.013.052l.2.346a.11.11 0 0 0 .089.052h.918a.12.12 0 0 0 .091-.052l.2-.346c.016-.029.003-.052-.03-.052z"
        style={{
          fill: `url(#${id}a)`,
          fillRule: "nonzero",
        }}
        transform="translate(64.291 201.91) scale(153.83227)"
      />
      <path
        d="M.942-.107a.08.08 0 0 0-.064-.038H.591c-.023 0-.033.016-.021.037l.084.146L.327.037a.08.08 0 0 0-.064.038L.119.322a.08.08 0 0 0 0 .075l.011.02A.04.04 0 0 1 .144.365.03.03 0 0 1 .162.36V.359l1.007.003c.023 0 .033-.017.021-.038z"
        style={{
          fill: `url(#${id}b)`,
          fillRule: "nonzero",
        }}
        transform="rotate(-60.1 177.057 124.702) scale(215.0151)"
      />
      <path
        d="m.204-.195.143.283a.1.1 0 0 0 .074.043h.649v.001q.01 0 .02.005a.044.044 0 0 1 .016.06l.013-.023a.1.1 0 0 0 0-.085L.956-.194a.1.1 0 0 0-.074-.043L.229-.238q-.02 0-.027.012-.008.012.002.031"
        style={{
          fill: `url(#${id}c)`,
          fillRule: "nonzero",
        }}
        transform="rotate(57.6 27.606 135.551) scale(188.4876)"
      />
      <defs>
        <linearGradient
          id={`${id}a`}
          x1={0}
          x2={1}
          y1={0}
          y2={0}
          gradientTransform="matrix(1 0 0 -1 0 -.002)"
          gradientUnits="userSpaceOnUse"
        >
          <stop
            offset={0}
            style={{
              stopColor: "#569cb4",
              stopOpacity: 1,
            }}
          />
          <stop
            offset={1}
            style={{
              stopColor: "#0d577b",
              stopOpacity: 1,
            }}
          />
        </linearGradient>
        <linearGradient
          id={`${id}b`}
          x1={0}
          x2={1}
          y1={0}
          y2={0}
          gradientTransform="matrix(1 0 0 -1 0 .271)"
          gradientUnits="userSpaceOnUse"
        >
          <stop
            offset={0}
            style={{
              stopColor: "#89171a",
              stopOpacity: 1,
            }}
          />
          <stop
            offset={0.8}
            style={{
              stopColor: "#ec212b",
              stopOpacity: 1,
            }}
          />
          <stop
            offset={1}
            style={{
              stopColor: "#ec212b",
              stopOpacity: 1,
            }}
          />
        </linearGradient>
        <linearGradient
          id={`${id}c`}
          x1={0}
          x2={1}
          y1={0}
          y2={0}
          gradientTransform="matrix(1 0 0 -1 0 -.041)"
          gradientUnits="userSpaceOnUse"
        >
          <stop
            offset={0}
            style={{
              stopColor: "#0d577b",
              stopOpacity: 1,
            }}
          />
          <stop
            offset={1}
            style={{
              stopColor: "#569cb4",
              stopOpacity: 1,
            }}
          />
        </linearGradient>
      </defs>
    </svg>
  );
};
