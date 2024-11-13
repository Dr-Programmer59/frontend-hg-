"use client";

import { useState, useEffect } from "react";
import DashboardSidebar from "./dashboardSidebar/page";
import DashboardHeader from "./dashboardHeader/page";
import DashboardHome from "./home/page";
import DashboardAnalytics from "./analytics/page";
import DashboardSettings from "./settings/page";
import { Modal } from "@/components";
import StartLiveStream from "./live/startLiveStream";
import { AlignLeft, X } from "lucide-react";
import Content from "./content/page";
import Profile from "./profile/page";
import { useSelector } from "react-redux";

export default function Dashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState("dashboard");
  

  const renderCurrentPage = () => {
    switch (currentPage) {
      case "dashboard":
        return <DashboardHome />;
      case "analytics":
        return <DashboardAnalytics />;
      case "settings":
        return <DashboardSettings />;
      case "content":
        return <Content />;
      case "profile":
        return <Profile />;
      default:
        return <DashboardHome />;
    }
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  useEffect(() => {
    console.log("modal status : ", modalOpen);
  }, [modalOpen]);

  return (
    <div className="flex">
      <DashboardSidebar
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        isOpen={sidebarOpen}
      />
      <div className={`flex-grow ml-0 lg:ml-64 transition-all duration-300`}>
        <DashboardHeader
          sidebarOpen={sidebarOpen}
          setSidebarOpen={setSidebarOpen}
          modalOpen={modalOpen}
          setModalOpen={setModalOpen}
          profileOpen={profileOpen}
          setProfileOpen={setProfileOpen}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
        />

        <main className="p-6">{renderCurrentPage()}</main>
        <Modal isOpen={modalOpen}>
          <StartLiveStream onClose={closeModal} />
        </Modal>
      </div>
      <button
        className="lg:hidden fixed top-4 left-4 z-50 bg-primary text-black rounded p-2"
        onClick={() => setSidebarOpen((prev) => !prev)}
      >
        {sidebarOpen ? <X /> : <AlignLeft />}
      </button>
    </div>
  );
}
