import React, { useEffect, useRef } from "react";
import { useState } from "react";
import { getGrid } from "../../utils/startinggrid";
import "./grid.css";
import { useParams } from "../../context/context";
import { SiTarget } from "react-icons/si";
import { FaArrowAltCircleRight } from "react-icons/fa";

export default function Grid() {
  const {
    grid,
    setgrid,
    editing,
    seteditFlag,
    mode,
    start,
    end,
    run,
    res,
    algo,
  } = useParams();

  const [refarray, mm] = useState(getrefarray(grid));
  //refarray containg object of null type
  function getrefarray(grid) {
    let array = [];
    grid.forEach((elem) => {
      elem.forEach((child) => {
        array.push(useRef());
        // console.log(array[array.length-1]);
      });
    });
    return array;
  }

  function BFS(graph, hashmap, prevmap, start, target) {
    let queue = [start]; // think like queue here start and traget  is an object ,
    let count = 0;

    hashmap[`${start.x}-${start.y}`] = true; //visited node
    while (queue.length > 0) {
      count += 1;
      let c = queue.pop(); //last ele of queue
      if (count == 1) console.log(c);
      refarray[c.x + c.y * 50].current.style["transition-delay"] = `${
        count * 8
      }ms`;

      refarray[c.x + c.y * 50].current.classList.add("visited");

      if (c.x == target.x && c.y == target.y) return [c, count];

      if (
        c.x + 1 < 50 && //in the range
        !hashmap[`${c.x + 1}-${c.y}`] && //not visited
        !graph[c.y][c.x + 1].iswall //not wall
      ) {
        queue.unshift({ x: c.x + 1, y: c.y });
        prevmap[`${c.x + 1}-${c.y}`] = { ...c };
        hashmap[`${c.x + 1}-${c.y}`] = true;
      }

      if (
        c.x - 1 >= 0 &&
        !hashmap[`${c.x - 1}-${c.y}`] &&
        !graph[c.y][c.x - 1].iswall
      ) {
        queue.unshift({ x: c.x - 1, y: c.y });
        prevmap[`${c.x - 1}-${c.y}`] = { ...c };
        hashmap[`${c.x - 1}-${c.y}`] = true;
      }
      if (
        c.y + 1 < 25 &&
        !hashmap[`${c.x}-${c.y + 1}`] &&
        !graph[c.y + 1][c.x].iswall
      ) {
        queue.unshift({ x: c.x, y: c.y + 1 });
        prevmap[`${c.x}-${c.y + 1}`] = { ...c };
        hashmap[`${c.x}-${c.y + 1}`] = true;
      }
      if (
        c.y - 1 >= 0 &&
        !hashmap[`${c.x}-${c.y - 1}`] &&
        !graph[c.y - 1][c.x].iswall
      ) {
        queue.unshift({ x: c.x, y: c.y - 1 });
        prevmap[`${c.x}-${c.y - 1}`] = { ...c };
        hashmap[`${c.x}-${c.y - 1}`] = true;
      }
    }
    return null;
  }

  var countbds = 0;
  var isfound = false;
  var obj = null;
  function BDS(graph, hashmap, prevmap, c, target) {
    hashmap[`${c.x}-${c.y}`] = true;
    countbds++;
    refarray[c.x + c.y * 50].current.style["transition-delay"] = `${
      countbds * 8
    }ms`;
    refarray[c.x + c.y * 50].current.classList.add("visited");

    if (c.x == target.x && c.y == target.y) {
      isfound = true;

      obj = c;

      return [c, countbds];
    }

    if (
      c.x + 1 < 50 &&
      !hashmap[`${c.x + 1}-${c.y}`] &&
      !graph[c.y][c.x + 1].iswall &&
      !isfound
    ) {
      prevmap[`${c.x + 1}-${c.y}`] = c;
      BDS(graph, hashmap, prevmap, { x: c.x + 1, y: c.y }, target);
    }

    if (
      c.y - 1 >= 0 &&
      !hashmap[`${c.x}-${c.y - 1}`] &&
      !graph[c.y - 1][c.x].iswall &&
      !isfound
    ) {
      prevmap[`${c.x}-${c.y - 1}`] = c;
      BDS(graph, hashmap, prevmap, { x: c.x, y: c.y - 1 }, target);
    }

    if (
      c.x - 1 >= 0 &&
      !hashmap[`${c.x - 1}-${c.y}`] &&
      !graph[c.y][c.x - 1].iswall &&
      !isfound
    ) {
      prevmap[`${c.x - 1}-${c.y}`] = c;
      BDS(graph, hashmap, prevmap, { x: c.x - 1, y: c.y }, target);
    }

    if (
      c.y + 1 < 25 &&
      !hashmap[`${c.x}-${c.y + 1}`] &&
      !graph[c.y + 1][c.x].iswall &&
      !isfound
    ) {
      prevmap[`${c.x}-${c.y + 1}`] = c;
      BDS(graph, hashmap, prevmap, { x: c.x, y: c.y + 1 }, target);
    }
  }

  useEffect(() => {
    if (algo == "BFS") {
      let hashmap = {};
      let prevmap = {};
      for (let j = 0; j < 25; j++) {
        for (let i = 0; i < 50; i++) {
          hashmap[`${i}-${j}`] = false;
          prevmap[`${i}-${j}`] = null;
        }
      }

      let result = BFS(grid, hashmap, prevmap, start.current, end.current);
      let path = [];

      if (result != null) {
        let current = result[0]; //target node

        while (prevmap[`${current.x}-${current.y}`] != null) {
          //it will b null at start node
          path.push(current);
          current = prevmap[`${current.x}-${current.y}`];
        }

        setTimeout(() => {
          path.reverse().forEach((elem, index) => {
            refarray[elem.x + elem.y * 50].current.style[
              "transition-delay"
            ] = `${index * 15}ms`;
            refarray[elem.x + elem.y * 50].current.classList.add("path");
          });
        }, result[1] * 9);
      }
    }

    if (algo == "BDS") {
      countbds = 0;
      let hashmap = {};
      let prevmap = {};
      for (let j = 0; j < 25; j++) {
        for (let i = 0; i < 50; i++) {
          hashmap[`${i}-${j}`] = false;
          prevmap[`${i}-${j}`] = null;
        }
      }
      let result = BDS(grid, hashmap, prevmap, start.current, end.current);

      let path = [];
      if (obj != null) {
        let current = obj;
        while (prevmap[`${current.x}-${current.y}`] != null) {
          path.push(current);
          current = prevmap[`${current.x}-${current.y}`];
        }
        setTimeout(() => {
          path.reverse().forEach((elem, index) => {
            refarray[elem.x + elem.y * 50].current.style[
              "transition-delay"
            ] = `${index * 15}ms`;
            refarray[elem.x + elem.y * 50].current.classList.add("path");
          });
        }, countbds * 9);
      }
    }
  }, [run]);

  useEffect(() => {
    refarray.forEach((elem) => {
      elem.current.style["transition-delay"] = "0ms";
    });
    refarray.forEach((elem) => {
      elem.current.classList.remove("visited");
      elem.current.classList.remove("path");
    });
  }, [res]);

  return (
    <div className="board">
      {refarray.map((elem, index) => {
        let classList = ["cell"];

        let yindex = Math.floor(index / 50); //xaxis
        let xindex = index % 50; //
        let cell = grid[yindex][xindex]; //object of nulltype in given pos of original grid

        if (cell.iswall) {
          classList.push("wall");
        }

        return (
          <div
            key={`${index}`}
            ref={elem}
            className={classList.join(" ")}
            onMouseDown={() => {
              //when we mousedown,only then we are editing
              seteditFlag(true); //so it simultaneous process,once we mpousedown ,we have to mouse up and
              //set editflag to false  in below code
            }}
            onMouseUp={() => {
              seteditFlag(false); //when we mouse up ,then we donot
              //so it simultaneous process,once
            }}
            onMouseMove={() => {
              if (!editing) return;
              const current = grid[yindex][xindex];
              if (current.isstart || current.istarget) return;

              switch (mode) {
                case "setstart":
                  var newgrid = grid.map((elem) => {
                    //here newgrid is copyb of neww grid
                    return elem.map((elem) => {
                      if (!elem.isstart) return elem; //if its isStart==false we take as it is
                      return { ...elem, isstart: false }; //else we make is start==false, take in new gris
                    });
                  });
                  newgrid[yindex][xindex] = {
                    //setting newgrid cell posititon object propery to  and setting isStart=true,isTraget to false;
                    ...newgrid[yindex][xindex], //
                    isstart: true,
                    istarget: false,
                    weight: 1,
                    iswall: false,
                  };
                  start.current = { x: xindex, y: yindex }; //changing ref value (start) to current xindex and yindex
                  setgrid(newgrid); //chaing state value of grid to newgrid
                  break;

                case "settarget":
                  var newgrid = grid.map((elem) => {
                    return elem.map((elem) => {
                      if (!elem.istarget) return elem;
                      return { ...elem, istarget: false };
                    });
                  });
                  newgrid[yindex][xindex] = {
                    ...newgrid[yindex][xindex],
                    isstart: false,
                    istarget: true,
                    weight: 1,
                    iswall: false,
                  };
                  end.current = { x: xindex, y: yindex };
                  setgrid(newgrid);
                  break;

                case "addbricks":
                  var newgrid = grid.slice();
                  newgrid[yindex][xindex] = {
                    ...newgrid[yindex][xindex],
                    weight: 1,
                    iswall: true,
                  };
                  setgrid(newgrid);
                  break;

                case "addweight":
                  var newgrid = grid.slice();
                  newgrid[yindex][xindex] = {
                    ...newgrid[yindex][xindex],
                    weight: 5,
                    iswall: false,
                  };
                  setgrid(newgrid);
                  break;
                default:
                  return;
              }
            }}
          >
            {cell.isstart ? <FaArrowAltCircleRight /> : null}
            {cell.istarget ? <SiTarget /> : null}
          </div>
        );
      })}
    </div>
  );
}
