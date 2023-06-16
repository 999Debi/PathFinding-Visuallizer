import React, { useState } from "react";
import "./Navbar.css";

import { useParams } from "../../context/context";
import { FaArrowAltCircleRight } from "react-icons/fa";
import { SiTarget } from "react-icons/si";
import { GiBrickWall } from "react-icons/gi";
import { GrPowerReset } from "react-icons/gr";
import { BsFillPlayCircleFill } from "react-icons/bs";

export default function Navbar() {
  const {
    mode,
    setmode,
    algo,
    setalgo,
    setres,
    setrun,
    editing,
    seteditFlag,
    start,
    end,
  } = useParams();

  return (
    <div className="navbar">
      <div className="container">
        <div>
          <h1
            style={{ color: "white", fontFamily: "Ubuntu", fontSize: "2.2rem" }}
          >
            Pathfinding Visualizer
          </h1>
        </div>
        <div className="allbtn">
          <div>
            <button
              style={{ position: "relative" }}
              type="button"
              className={[
                "btn",
                "btn-warning",
                mode == "setstart" ? "selected" : "",
                "btn-hover",
              ].join(" ")}
              onClick={() => {
                if (mode == "setstart") setmode(null);
                else {
                  setmode("setstart");
                }
              }}
            >
              <FaArrowAltCircleRight />
            </button>
          </div>

          <button
            type="button"
            className={[
              "btn",
              "tar",
              "btn-warning",
              mode == "settarget" ? "selected" : "",
            ].join(" ")}
            onClick={() => {
              if (mode == "settarget") setmode(null);
              else {
                setmode("settarget");
              }
            }}
          >
            <SiTarget />
          </button>

          <button
            type="button"
            className={[
              "btn",
              "btn-warning",
              mode == "addbricks" ? "selected" : "",
            ].join(" ")}
            onClick={() => {
              if (mode == "addbricks") setmode(null);
              else {
                setmode("addbricks");
              }
            }}
          >
            <GiBrickWall />
          </button>

          <button
            type="button"
            className="btn btn-warning"
            onClick={() => {
              setres((old) => {
                start.current = { x: 25, y: 12 };
                end.current = { x: 48, y: 12 };
                setmode(null);
                return !old;
              });
            }}
          >
            <GrPowerReset />
          </button>

          <button
            type="button"
            className="btn btn-warning"
            onClick={() => {
              setrun((old) => {
                return !old;
              });
            }}
          >
            <BsFillPlayCircleFill />
          </button>
        </div>

        <div className="select">
          <select
            className="form-select"
            aria-label="Default select example"
            value={algo}
            onChange={(e) => {
              setalgo(e.target.value);
            }}
          >
            <option value="">Pick an algorithm</option>
            <option value="BDS">DFS</option>
            <option value="BFS">BFS</option>
          </select>
        </div>
      </div>
    </div>
  );
}
