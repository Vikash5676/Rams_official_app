import React, { useState } from "react";
import styles from "./Dashboard.module.css";
import {
  FaDownload,
  FaEdit,
  FaShieldAlt,
  FaStore,
  FaTable,
  FaTruck,
  FaUserTie,
} from "react-icons/fa";

import { AiFillProject, AiOutlineFileSearch } from "react-icons/ai";
import { Link, Outlet } from "react-router-dom";
import { FcRules } from "react-icons/fc";

function Dashboard() {
  const [showMenu, setShowMenu] = useState({
    col1: false,
    col2: false,
    col3: false,
    col4: false,
    col5: false,
  });
  const handleClick = (col) => {
    if (col === "col1") setShowMenu({ ...showMenu, [col]: !showMenu.col1 });
    if (col === "col2") setShowMenu({ ...showMenu, [col]: !showMenu.col2 });
    if (col === "col3") setShowMenu({ ...showMenu, [col]: !showMenu.col3 });
    if (col === "col4") setShowMenu({ ...showMenu, [col]: !showMenu.col4 });
    if (col === "col5") setShowMenu({ ...showMenu, [col]: !showMenu.col5 });
    if (col === "col6") setShowMenu({ ...showMenu, [col]: !showMenu.col6 });
  };

  return (
    <div className="bg-[var(--color-2)]">
      <main class={`${styles.main} ${styles.container}`}>
        <h1>Welcome Back Admin😀</h1>

        <div
          class={`${styles.col} ${styles.col1}`}
          onClick={() => {
            handleClick("col1");
          }}
        >
          {!showMenu.col1 ? (
            <>
              <div class={styles.heading}>Worker</div>
              <div>
                <FaUserTie class={styles.icon} />
              </div>
            </>
          ) : (
            <ul className="flex flex-col  font-semibold">
              <li className="flex items-center gap-2">
                <Link to={"/all-emp"} className=" text-[1.5rem] text-black ">
                  Worker Details
                </Link>
                <FaTable />
              </li>
            </ul>
          )}
        </div>

        <div
          class={`${styles.col} ${styles.col2}`}
          onClick={() => {
            handleClick("col2");
          }}
        >
          {!showMenu.col2 ? (
            <>
              <div class={styles.heading}>Material</div>
              <div>
                <FaStore class={styles.icon} />
              </div>
            </>
          ) : (
            <ul className="flex flex-col gap-2  font-semibold">
              <li className="flex items-center gap-2">
                <Link
                  to={"/material"}
                  className=" text-[1.5rem] text-black flex items-center gap-2"
                >
                  Material Details
                </Link>
                <FaTable />
              </li>
            </ul>
          )}
        </div>
        <div
          class={`${styles.col} ${styles.col3}`}
          onClick={() => {
            handleClick("col3");
          }}
        >
          {!showMenu.col3 ? (
            <>
              <div class={styles.heading}>Saftey</div>
              <div>
                <FaShieldAlt class={styles.icon} />
              </div>
            </>
          ) : (
            <ul className="flex flex-col gap-2  font-semibold ">
              <li className="flex items-center gap-2">
                <Link
                  to={"/safety-table"}
                  className=" text-[1.5rem] text-black flex items-center gap-2"
                >
                  Saftey Ovservation Details
                </Link>
                <FaTable />
              </li>
              <li className="flex items-center justify-center gap-2">
                <Link
                  href={"#"}
                  className=" text-[1.5rem] text-black flex items-center gap-2"
                >
                  Work SOP
                </Link>
                <FaDownload />
              </li>
            </ul>
          )}
        </div>
        <div
          class={`${styles.col} ${styles.col4}`}
          onClick={() => {
            handleClick("col4");
          }}
        >
          {!showMenu.col4 ? (
            <>
              <div class={styles.heading}>Vehicle</div>
              <div>
                <FaTruck class={styles.icon} />
              </div>
            </>
          ) : (
            <ul className="flex flex-col gap-2  font-semibold">
              <li className="flex items-center gap-2">
                <Link
                  to={"/vehicle-data"}
                  className=" text-[1.5rem] text-black flex items-center gap-2"
                >
                  Vehicle Data
                </Link>
                <FaTable />
              </li>
              <li className="flex items-center gap-2">
                <Link
                  to={"/vehicle-entry"}
                  className=" text-[1.5rem] text-black flex items-center gap-2"
                >
                  Vehicle Details
                </Link>
                <FaTable />
              </li>
            </ul>
          )}
        </div>
        <div
          class={`${styles.col} ${styles.col5}`}
          onClick={() => {
            handleClick("col5");
          }}
        >
          {!showMenu.col5 ? (
            <>
              <div class={styles.heading}>Carrers</div>
              <div>
                <AiOutlineFileSearch class={styles.icon} />
              </div>
            </>
          ) : (
            <ul className="flex flex-col gap-2  font-semibold">
              <li className="flex items-center gap-2">
                <Link
                  href={"/job-details"}
                  className=" text-[1.5rem] text-black flex items-center gap-2"
                >
                  New Job/ position Entry
                </Link>
                <FaEdit />
              </li>
            </ul>
          )}
        </div>
        <div
          class={`${styles.col} ${styles.col6}`}
          onClick={() => {
            handleClick("col6");
          }}
        >
          {!showMenu.col6 ? (
            <>
              <div class={styles.heading}>SOP</div>
              <div>
                <FcRules class={styles.icon} />
              </div>
            </>
          ) : (
            <ul className="flex flex-col gap-2  font-semibold">
              <li className="flex items-center gap-2">
                <Link
                  href={"#"}
                  className=" text-[1.5rem] text-black flex items-center gap-2"
                >
                  Download SOP
                </Link>
                <FaDownload />
              </li>
              <li className="flex items-center gap-2">
                <Link
                  href={"#"}
                  className=" text-[1.5rem] text-black flex items-center gap-2"
                >
                  Project Update
                </Link>
                <AiFillProject />
              </li>
            </ul>
          )}
        </div>
      </main>
      <Outlet />
    </div>
  );
}

export default Dashboard;
