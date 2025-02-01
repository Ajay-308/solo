("use client");
import Image from "next/image";
import { User, Mail, Calendar, Award, MapPin, Clock } from "lucide-react";

export default function Profile() {
  const achievements = [
    { title: "First Dungeon Clear", date: "2024-01-15" },
    { title: "Reached S-Rank", date: "2024-02-20" },
    { title: "Defeated Demon King", date: "2024-03-01" },
    { title: "Shadow Army 100 Members", date: "2024-03-10" },
  ];

  const recentActivities = [
    { action: "Cleared Demon Castle Dungeon", time: "2 hours ago" },
    { action: "Extracted High Orc Shadow", time: "5 hours ago" },
    { action: "Completed Daily Quest", time: "1 day ago" },
    { action: "Upgraded Shadow Extraction", time: "2 days ago" },
  ];

  return (
    <div className="min-h-screen pt-16 p-6">
      <div className="max-w-4xl mx-auto">
        {/* Profile Header */}
        <div className="bg-blue-950/40 rounded-lg p-8 backdrop-blur-sm border border-blue-500/30 shadow-lg mb-8">
          <div className="flex flex-col md:flex-row gap-8 items-center md:items-start">
            <div className="w-32 h-32 rounded-full bg-gradient-to-br from-blue-500/20 to-purple-500/20 border border-blue-400/30 flex items-center justify-center overflow-hidden">
              <Image
                src="https://images.unsplash.com/photo-1544723795-3fb6469f5b39?auto=format&fit=crop&q=80&w=300&h=300"
                alt="Profile"
                width={128}
                height={128}
                className="w-full h-full object-cover"
                priority
              />
            </div>
            <div className="text-center md:text-left">
              <h1 className="text-3xl font-bold text-blue-300 mb-2">
                Sung Jin-Woo
              </h1>
              <p className="text-blue-400/80 mb-4">
                Shadow Monarch | S-Rank Hunter
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex items-center gap-2 text-blue-400/70">
                  <Mail className="w-4 h-4" />
                  <span>jinwoo@hunter.org</span>
                </div>
                <div className="flex items-center gap-2 text-blue-400/70">
                  <MapPin className="w-4 h-4" />
                  <span>Seoul, South Korea</span>
                </div>
                <div className="flex items-center gap-2 text-blue-400/70">
                  <Calendar className="w-4 h-4" />
                  <span>Joined March 2024</span>
                </div>
                <div className="flex items-center gap-2 text-blue-400/70">
                  <User className="w-4 h-4" />
                  <span>ID: #SL-001</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Achievements */}
          <div className="bg-blue-950/40 rounded-lg p-6 backdrop-blur-sm border border-blue-500/30">
            <h2 className="text-xl font-bold text-blue-300 mb-4 flex items-center gap-2">
              <Award className="w-5 h-5" />
              Achievements
            </h2>
            <div className="space-y-4">
              {achievements.map((achievement, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-3 rounded-lg bg-blue-500/10 border border-blue-500/20"
                >
                  <span className="text-blue-300">{achievement.title}</span>
                  <span className="text-blue-400/70 text-sm">
                    {achievement.date}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Recent Activity */}
          <div className="bg-blue-950/40 rounded-lg p-6 backdrop-blur-sm border border-blue-500/30">
            <h2 className="text-xl font-bold text-blue-300 mb-4 flex items-center gap-2">
              <Clock className="w-5 h-5" />
              Recent Activity
            </h2>
            <div className="space-y-4">
              {recentActivities.map((activity, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-3 rounded-lg bg-blue-500/10 border border-blue-500/20"
                >
                  <span className="text-blue-300">{activity.action}</span>
                  <span className="text-blue-400/70 text-sm">
                    {activity.time}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
