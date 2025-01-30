const ShimmerHome = () => {
  return (
    <div className="flex flex-col md:flex-row gap-4 p-6">
      <div className="flex-1 bg-gray-900 p-4 rounded-lg">
        <div className="flex justify-between mb-4">
          <div className="h-6 w-32 bg-gray-700 animate-pulse rounded"></div>
          <div className="h-6 w-24 bg-gray-700 animate-pulse rounded"></div>
        </div>

        <div className="space-y-4">
          {Array(3)
            .fill('')
            .map((_, index) => (
              <div key={index} className="p-4 bg-gray-800 rounded-lg">
                <div className="h-5 w-48 bg-gray-700 animate-pulse rounded mb-2"></div>
                <div className="h-4 w-64 bg-gray-700 animate-pulse rounded mb-2"></div>
                <div className="h-4 w-32 bg-gray-700 animate-pulse rounded mb-4"></div>

                <div className="flex gap-2">
                  <div className="h-8 w-16 bg-gray-600 animate-pulse rounded"></div>
                  <div className="h-8 w-16 bg-gray-600 animate-pulse rounded"></div>
                </div>
              </div>
            ))}
        </div>

        <div className="flex justify-center mt-4 gap-2">
          <div className="h-8 w-16 bg-gray-700 animate-pulse rounded"></div>
          <div className="h-8 w-16 bg-gray-700 animate-pulse rounded"></div>
        </div>
      </div>

      <div className="w-full md:w-1/3 bg-gray-900 p-4 rounded-lg">
        <div className="h-6 w-40 bg-gray-700 animate-pulse rounded mb-4"></div>

        <div className="h-10 w-full bg-gray-800 animate-pulse rounded mb-4"></div>
        <div className="h-20 w-full bg-gray-800 animate-pulse rounded mb-4"></div>

        <div className="h-6 w-24 bg-gray-700 animate-pulse rounded mb-2"></div>
        <div className="h-4 w-full bg-gray-800 animate-pulse rounded mb-4"></div>

        <div className="h-12 w-full bg-blue-700 animate-pulse rounded"></div>
      </div>
    </div>
  );
};

export default ShimmerHome;
