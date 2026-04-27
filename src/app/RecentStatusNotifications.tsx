export function RecentStatusNotifications() {
  return (
    <div className="space-y-4">
      {[1, 2, 3].map((i) => (
        <div key={i} className="flex items-center justify-between p-4 bg-slate-50 rounded-2xl border border-teal-50">
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center font-bold text-teal-600">S</div>
            <div>
              <p className="font-bold text-teal-900">Student Submission #{i}</p>
              <p className="text-xs text-teal-500 font-medium italic">Passport: REF-N/A • DB: CLOUDSYNC</p>
            </div>
          </div>
          <span className="px-3 py-1 bg-teal-100 text-teal-600 text-[10px] font-black uppercase rounded-full">In Review</span>
        </div>
      ))}
    </div>
  );
}