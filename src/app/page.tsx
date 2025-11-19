import CaseForm from "@/components/CaseForm";
import DetectionFeed from "@/components/DetectionFeed";
import { Shield } from "lucide-react";

export default function Home() {
  return (
    <main className="min-h-screen bg-gray-100">
      {/* Header */}
      <header className="bg-slate-900 text-white shadow-lg">
        <div className="max-w-7xl mx-auto px-4 py-6 sm:px-6 lg:px-8 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Shield className="w-8 h-8 text-blue-400" />
            <h1 className="text-2xl font-bold tracking-tight">
              Law Enforcement Surveillance Portal
            </h1>
          </div>
          <div className="text-sm text-gray-400">
            System Status: <span className="text-green-400 font-medium">Online</span>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

          {/* Left Column: Case Management */}
          <div className="lg:col-span-1 space-y-6">
            <section>
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Operations</h2>
              <CaseForm />
            </section>

            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <h3 className="font-medium text-blue-900 mb-2">Quick Stats</h3>
              <div className="grid grid-cols-2 gap-4 text-center">
                <div className="bg-white p-3 rounded shadow-sm">
                  <div className="text-2xl font-bold text-blue-600">--</div>
                  <div className="text-xs text-gray-500">Active Cases</div>
                </div>
                <div className="bg-white p-3 rounded shadow-sm">
                  <div className="text-2xl font-bold text-red-600">--</div>
                  <div className="text-xs text-gray-500">Detections Today</div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Live Feed */}
          <div className="lg:col-span-2">
            <DetectionFeed />
          </div>

        </div>
      </div>
    </main>
  );
}
