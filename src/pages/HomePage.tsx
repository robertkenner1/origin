import skeletonLoaderPreview from '../../img/Short-form loading.png';

export function HomePage() {
  return (
    <div className="min-h-screen bg-background animate-fade-in">
      <div className="w-full px-6 py-12 max-w-[1400px] mx-auto">
        {/* Hero Section */}
        <section className="relative overflow-hidden mb-16" style={{
          background: 'linear-gradient(to right, #FFE5D9 0%, #F8D5E8 30%, #E5D5F8 60%, #D5E0FF 100%)',
          borderRadius: '44px',
        }}>
          {/* Flowing dashed line pattern overlay */}
          <div className="absolute inset-0 overflow-hidden opacity-20">
            <svg className="absolute inset-0 w-full h-full" preserveAspectRatio="none" viewBox="0 0 1400 600">
              <defs>
                <linearGradient id="heroPattern" x1="100%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="#A682EA" stopOpacity="0.8"/>
                  <stop offset="100%" stopColor="#ADBFF9" stopOpacity="0.8"/>
                </linearGradient>
              </defs>
              <g stroke="url(#heroPattern)" strokeWidth="1" fill="none" strokeDasharray="10 8" strokeLinecap="round">
                {[...Array(50)].map((_, i) => {
                  const y = i * 15;
                  const amplitude = 100;
                  return (
                    <path
                      key={i}
                      d={`M-50 ${y} Q ${350 + Math.sin(i * 0.3) * amplitude} ${y + Math.cos(i * 0.2) * 25}, ${700 + Math.sin(i * 0.5) * amplitude} ${y} T ${1400 + Math.sin(i * 0.4) * amplitude} ${y}`}
                    />
                  );
                })}
              </g>
            </svg>
          </div>
          
          <div className="relative z-10 flex flex-col justify-between p-10" style={{ minHeight: '460px' }}>
            <h1 className="font-bold max-w-2xl leading-[1.2]" style={{ fontSize: '68px', letterSpacing: '-0.68px' }}>
              Every hero's journey has an origin
            </h1>
            
            <div className="flex flex-wrap justify-between items-baseline gap-6">
              <div className="flex flex-wrap gap-2 items-baseline">
                <span className="text-base font-medium text-foreground">Origin version 0 is here!</span>
                <a 
                  href="#" 
                  className="inline-flex items-center px-3 py-1.5 rounded-[30px] text-base font-medium text-foreground hover:opacity-90 transition-opacity"
                  style={{ backgroundImage: 'linear-gradient(108.544deg, rgba(255, 255, 255, 0.6) 0.96499%, rgba(255, 255, 255, 0.8) 91.7%)' }}
                >
                  Read the FAQ
                  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" className="ml-1">
                    <path d="M17.625 7.61816C19.4583 8.67664 19.4583 11.3234 17.625 12.3818L10.375 16.5674L9.625 15.2686L16.875 11.082C17.0292 10.993 17.1548 10.8793 17.252 10.75H1V9.25H17.252C17.1548 9.12055 17.0293 9.0061 16.875 8.91699L9.625 4.73145L10.375 3.43262L17.625 7.61816Z" fill="currentColor"/>
                  </svg>
                </a>
              </div>
              <div className="flex flex-wrap gap-2 items-baseline">
                <span className="text-base font-medium text-foreground">Looking for previous documentation?</span>
                <a 
                  href="#" 
                  className="inline-flex items-center px-3 py-1.5 rounded-[30px] text-base font-medium text-foreground hover:opacity-90 transition-opacity"
                  style={{ backgroundImage: 'linear-gradient(104.827deg, rgba(255, 255, 255, 0.6) 0.96499%, rgba(255, 255, 255, 0.8) 91.7%)' }}
                >
                  Version 6
                  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" className="ml-1">
                    <path d="M17.625 7.61816C19.4583 8.67664 19.4583 11.3234 17.625 12.3818L10.375 16.5674L9.625 15.2686L16.875 11.082C17.0292 10.993 17.1548 10.8793 17.252 10.75H1V9.25H17.252C17.1548 9.12055 17.0293 9.0061 16.875 8.91699L9.625 4.73145L10.375 3.43262L17.625 7.61816Z" fill="currentColor"/>
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* System Essentials */}
        <section className="mb-16">
          <h2 className="text-xs font-semibold mb-6 uppercase tracking-wide text-muted-foreground">System essentials</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Foundations Card */}
            <a href="#" className="group flex flex-col rounded-3xl bg-[#F5F5F5] p-8 transition-colors hover:bg-[#EBEBEB]">
              <div className="w-[52px] h-[52px] rounded-[15px] flex items-center justify-center p-2.5 mb-6 relative" style={{
                background: 'rgba(255, 255, 255, 0.8)',
                border: '1px solid transparent',
                backgroundImage: 'linear-gradient(rgba(255, 255, 255, 0.8), rgba(255, 255, 255, 0.8)), linear-gradient(45deg, rgba(188, 188, 188, 0.4) 0%, rgba(255, 255, 255, 0.6) 41%, rgba(188, 188, 188, 0.3) 100%)',
                backgroundOrigin: 'padding-box, border-box',
                backgroundClip: 'padding-box, border-box'
              }}>
                <svg width="24" height="24" viewBox="0 0 32 32" fill="none">
                  <path d="M12.0001 9.20008C12.0001 8.39911 11.9936 8.17343 11.961 8.00945C11.8031 7.21652 11.1836 6.59709 10.3907 6.43914C10.2267 6.40652 10.001 6.40008 9.20008 6.40008C8.39911 6.40008 8.17343 6.40652 8.00945 6.43914C7.21652 6.59709 6.59709 7.21652 6.43914 8.00945C6.40652 8.17343 6.40008 8.39911 6.40008 9.20008C6.40008 10.001 6.40652 10.2267 6.43914 10.3907C6.59709 11.1836 7.21652 11.8031 8.00945 11.961C8.17343 11.9936 8.39911 12.0001 9.20008 12.0001C10.001 12.0001 10.2267 11.9936 10.3907 11.961C11.1836 11.8031 11.8031 11.1836 11.961 10.3907C11.9936 10.2267 12.0001 10.001 12.0001 9.20008ZM14.4001 9.20008C14.4001 9.88571 14.4059 10.4038 14.3157 10.8579C13.9685 12.6033 12.6033 13.9685 10.8579 14.3157C10.4038 14.4059 9.88571 14.4001 9.20008 14.4001C8.51445 14.4001 7.99638 14.4059 7.54226 14.3157C5.79683 13.9685 4.43164 12.6033 4.08445 10.8579C3.99422 10.4038 4.00008 9.88571 4.00008 9.20008C4.00008 8.51445 3.99422 7.99638 4.08445 7.54226C4.43164 5.79683 5.79683 4.43164 7.54226 4.08445C7.99638 3.99422 8.51445 4.00008 9.20008 4.00008C9.88571 4.00008 10.4038 3.99422 10.8579 4.08445C12.6033 4.43164 13.9685 5.79683 14.3157 7.54226C14.4059 7.99638 14.4001 8.51445 14.4001 9.20008Z" fill="#545454"/>
                  <path d="M12.0001 22.8001C12.0001 21.9991 11.9936 21.7734 11.961 21.6095C11.8031 20.8165 11.1836 20.1971 10.3907 20.0391C10.2267 20.0065 10.001 20.0001 9.20008 20.0001C8.39911 20.0001 8.17343 20.0065 8.00945 20.0391C7.21652 20.1971 6.59709 20.8165 6.43914 21.6095C6.40652 21.7734 6.40008 21.9991 6.40008 22.8001C6.40008 23.601 6.40652 23.8267 6.43914 23.9907C6.59709 24.7836 7.21652 25.4031 8.00945 25.561C8.17343 25.5936 8.39911 25.6001 9.20008 25.6001C10.001 25.6001 10.2267 25.5936 10.3907 25.561C11.1836 25.4031 11.8031 24.7836 11.961 23.9907C11.9936 23.8267 12.0001 23.601 12.0001 22.8001ZM14.4001 22.8001C14.4001 23.4857 14.4059 24.0038 14.3157 24.4579C13.9685 26.2033 12.6033 27.5685 10.8579 27.9157C10.4038 28.0059 9.88571 28.0001 9.20008 28.0001C8.51445 28.0001 7.99638 28.0059 7.54226 27.9157C5.79683 27.5685 4.43164 26.2033 4.08445 24.4579C3.99422 24.0038 4.00008 23.4857 4.00008 22.8001C4.00008 22.1144 3.99422 21.5964 4.08445 21.1423C4.43164 19.3968 5.79683 18.0316 7.54226 17.6845C7.99638 17.5942 8.51445 17.6001 9.20008 17.6001C9.88571 17.6001 10.4038 17.5942 10.8579 17.6845C12.6033 18.0316 13.9685 19.3968 14.3157 21.1423C14.4059 21.5964 14.4001 22.1144 14.4001 22.8001Z" fill="#545454"/>
                  <path d="M25.6001 22.8001C25.6001 21.9991 25.5936 21.7734 25.561 21.6095C25.4031 20.8165 24.7836 20.1971 23.9907 20.0391C23.8267 20.0065 23.601 20.0001 22.8001 20.0001C21.9991 20.0001 21.7734 20.0065 21.6095 20.0391C20.8165 20.1971 20.1971 20.8165 20.0391 21.6095C20.0065 21.7734 20.0001 21.9991 20.0001 22.8001C20.0001 23.601 20.0065 23.8267 20.0391 23.9907C20.1971 24.7836 20.8165 25.4031 21.6095 25.561C21.7734 25.5936 21.9991 25.6001 22.8001 25.6001C23.601 25.6001 23.8267 25.5936 23.9907 25.561C24.7836 25.4031 25.4031 24.7836 25.561 23.9907C25.5936 23.8267 25.6001 23.601 25.6001 22.8001ZM28.0001 22.8001C28.0001 23.4857 28.0059 24.0038 27.9157 24.4579C27.5685 26.2033 26.2033 27.5685 24.4579 27.9157C24.0038 28.0059 23.4857 28.0001 22.8001 28.0001C22.1144 28.0001 21.5964 28.0059 21.1423 27.9157C19.3968 27.5685 18.0316 26.2033 17.6845 24.4579C17.5942 24.0038 17.6001 23.4857 17.6001 22.8001C17.6001 22.1144 17.5942 21.5964 17.6845 21.1423C18.0316 19.3968 19.3968 18.0316 21.1423 17.6845C21.5964 17.5942 22.1144 17.6001 22.8001 17.6001C23.4857 17.6001 24.0038 17.5942 24.4579 17.6845C26.2033 18.0316 27.5685 19.3968 27.9157 21.1423C28.0059 21.5964 28.0001 22.1144 28.0001 22.8001Z" fill="#545454"/>
                  <path d="M24.0001 4.40008V8.00008H27.6001V10.4001H24.0001V14.0001H21.6001V10.4001H18.0001V8.00008H21.6001V4.40008H24.0001Z" fill="#545454"/>
                </svg>
              </div>
              <h3 className="text-2xl font-semibold mb-3">Foundations</h3>
              <p className="text-sm text-muted-foreground mb-8 flex-grow">
                Foundations are the basic building blocks of our interface—colors, typography, elevation, and icons
              </p>
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M17.625 7.61816C19.4583 8.67664 19.4583 11.3234 17.625 12.3818L10.375 16.5674L9.625 15.2686L16.875 11.082C17.0292 10.993 17.1548 10.8793 17.252 10.75H1V9.25H17.252C17.1548 9.12055 17.0293 9.0061 16.875 8.91699L9.625 4.73145L10.375 3.43262L17.625 7.61816Z" fill="#1C1C1C"/>
              </svg>
            </a>

            {/* Components Card */}
            <a href="#" className="group flex flex-col rounded-3xl bg-[#F5F5F5] p-8 transition-colors hover:bg-[#EBEBEB]">
              <div className="w-[52px] h-[52px] rounded-[15px] flex items-center justify-center p-2.5 mb-6 relative" style={{
                background: 'rgba(255, 255, 255, 0.8)',
                border: '1px solid transparent',
                backgroundImage: 'linear-gradient(rgba(255, 255, 255, 0.8), rgba(255, 255, 255, 0.8)), linear-gradient(45deg, rgba(188, 188, 188, 0.4) 0%, rgba(255, 255, 255, 0.6) 41%, rgba(188, 188, 188, 0.3) 100%)',
                backgroundOrigin: 'padding-box, border-box',
                backgroundClip: 'padding-box, border-box'
              }}>
                <svg width="24" height="24" viewBox="0 0 32 32" fill="none">
                  <path d="M22 17.6001C25.3137 17.6001 28 20.2864 28 23.6001C27.9999 26.9138 25.3137 29.6001 22 29.6001H10C6.68632 29.6001 4.00005 26.9138 4 23.6001C4 20.2864 6.68629 17.6001 10 17.6001H22ZM10 20.0005C8.01178 20.0005 6.40039 21.6119 6.40039 23.6001C6.40044 25.5883 8.01181 27.1997 10 27.1997H22C23.9882 27.1997 25.5996 25.5883 25.5996 23.6001C25.5996 21.6119 23.9882 20.0005 22 20.0005H10ZM12.001 22.0005C12.8845 22.0006 13.6006 22.7165 13.6006 23.6001C13.6005 24.4836 12.8845 25.1996 12.001 25.1997H10.4004C9.51695 25.1995 8.80083 24.4836 8.80078 23.6001C8.80078 22.7166 9.51691 22.0007 10.4004 22.0005H12.001ZM22 2.3999C25.3137 2.3999 28 5.08619 28 8.3999C28 11.7136 25.3137 14.3999 22 14.3999H10C6.68629 14.3999 4 11.7136 4 8.3999C4 5.08619 6.68629 2.3999 10 2.3999H22ZM10 4.80029C8.01178 4.80029 6.40039 6.41168 6.40039 8.3999C6.40039 10.3881 8.01178 11.9995 10 11.9995H22C23.9882 11.9995 25.5996 10.3881 25.5996 8.3999C25.5996 6.41168 23.9882 4.80029 22 4.80029H10ZM21.5986 6.80029C22.4822 6.8004 23.1982 7.51631 23.1982 8.3999C23.1982 9.28345 22.4822 9.99941 21.5986 9.99951H19.998C19.1146 9.9993 18.3985 9.28338 18.3984 8.3999C18.3984 7.51638 19.1146 6.8005 19.998 6.80029H21.5986Z" fill="#545454"/>
                </svg>
              </div>
              <h3 className="text-2xl font-semibold mb-3">Components</h3>
              <p className="text-sm text-muted-foreground mb-8 flex-grow">
                Components are composed elements with unique properties. Each is accessible and reliable in common use cases.
              </p>
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M17.625 7.61816C19.4583 8.67664 19.4583 11.3234 17.625 12.3818L10.375 16.5674L9.625 15.2686L16.875 11.082C17.0292 10.993 17.1548 10.8793 17.252 10.75H1V9.25H17.252C17.1548 9.12055 17.0293 9.0061 16.875 8.91699L9.625 4.73145L10.375 3.43262L17.625 7.61816Z" fill="#1C1C1C"/>
              </svg>
            </a>

            {/* Patterns Card */}
            <a href="#" className="group flex flex-col rounded-3xl bg-[#F5F5F5] p-8 transition-colors hover:bg-[#EBEBEB]">
              <div className="w-[52px] h-[52px] rounded-[15px] flex items-center justify-center p-2.5 mb-6 relative" style={{
                background: 'rgba(255, 255, 255, 0.8)',
                border: '1px solid transparent',
                backgroundImage: 'linear-gradient(rgba(255, 255, 255, 0.8), rgba(255, 255, 255, 0.8)), linear-gradient(45deg, rgba(188, 188, 188, 0.4) 0%, rgba(255, 255, 255, 0.6) 41%, rgba(188, 188, 188, 0.3) 100%)',
                backgroundOrigin: 'padding-box, border-box',
                backgroundClip: 'padding-box, border-box'
              }}>
                <svg width="24" height="24" viewBox="0 0 32 32" fill="none">
                  <path fillRule="evenodd" clipRule="evenodd" d="M24.3992 4C26.8293 4 28.7992 5.96995 28.7992 8.4V23.6C28.7992 26.0301 26.8293 28 24.3992 28H7.59922C5.16917 28 3.19922 26.0301 3.19922 23.6V8.4C3.19922 5.96995 5.16917 4 7.59922 4H24.3992ZM12.7992 25.6H24.3992C25.5038 25.6 26.3992 24.7046 26.3992 23.6V20.8H12.7992V25.6ZM5.59922 23.6C5.59922 24.7046 6.49465 25.6 7.59922 25.6H10.3992V20.8H5.59922V23.6ZM12.7992 18.4H26.3992V13.6H12.7992V18.4ZM5.59922 18.4H10.3992V13.6H5.59922V18.4ZM7.59922 6.4C6.49465 6.4 5.59922 7.29543 5.59922 8.4V11.2H26.3992V8.4C26.3992 7.29543 25.5038 6.4 24.3992 6.4H7.59922Z" fill="#545454"/>
                </svg>
              </div>
              <h3 className="text-2xl font-semibold mb-3">Patterns</h3>
              <p className="text-sm text-muted-foreground mb-8 flex-grow">
                Patterns are relatively complex UI composed of components. Reuse and remix them for consistent user experiences.
              </p>
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M17.625 7.61816C19.4583 8.67664 19.4583 11.3234 17.625 12.3818L10.375 16.5674L9.625 15.2686L16.875 11.082C17.0292 10.993 17.1548 10.8793 17.252 10.75H1V9.25H17.252C17.1548 9.12055 17.0293 9.0061 16.875 8.91699L9.625 4.73145L10.375 3.43262L17.625 7.61816Z" fill="#1C1C1C"/>
              </svg>
            </a>
          </div>
        </section>

        {/* Latest Release / New Component */}
        <section className="mb-16">
          <div className="border-t border-[#bcbcbc] pt-2.5 pb-0 mb-6">
            <div className="flex items-baseline gap-2.5">
              <span className="text-sm font-medium text-[#2e2e2e]">Latest release</span>
              <span className="px-2 py-0.5 bg-[#b1f0e8] text-[#014c43] text-sm font-medium rounded-lg">Version 1.0</span>
            </div>
          </div>
          
          <div className="relative h-[400px] rounded-[44px] overflow-hidden" style={{
            background: 'linear-gradient(69.6deg, rgb(245, 234, 234) 1.53%, rgb(191, 186, 253) 72.06%, rgb(236, 202, 250) 101.31%)'
          }}>
            {/* Pattern Overlay */}
            <div className="absolute inset-0 overflow-hidden">
              <svg className="absolute inset-0 w-full h-full text-foreground" preserveAspectRatio="none" viewBox="0 0 1400 800" style={{ 
                top: '-294px',
                height: '834px',
                width: '1119px',
                left: '0'
              }}>
                <defs>
                  <linearGradient id="paint0_linear_release" x1="1400" y1="220.815" x2="-50" y2="482.815" gradientUnits="userSpaceOnUse">
                    <stop offset="0.00167081" stopColor="#A682EA" stopOpacity="0.2"/>
                    <stop offset="1" stopColor="#ADBFF9" stopOpacity="0.2"/>
                  </linearGradient>
                </defs>
                <g opacity="0.8" stroke="url(#paint0_linear_release)" strokeWidth="1" fill="none" strokeDasharray="10 8">
                  {Array.from({ length: 50 }).map((_, i) => {
                    const y = 50 + i * 15;
                    const controlPoint1X = 200 + Math.sin(i * 0.5) * 100;
                    const controlPoint1Y = y - 20 + Math.cos(i * 0.3) * 10;
                    const controlPoint2X = 600 + Math.cos(i * 0.4) * 120;
                    const controlPoint2Y = y + 15 + Math.sin(i * 0.6) * 10;
                    const endPointX = 1400;
                    const endPointY = y + Math.sin(i * 0.7) * 5;
                    return (
                      <path
                        key={i}
                        d={`M-50 ${y} C ${controlPoint1X} ${controlPoint1Y}, ${controlPoint2X} ${controlPoint2Y}, ${endPointX} ${endPointY}`}
                      />
                    );
                  })}
                </g>
              </svg>
            </div>

            {/* Content */}
            <div className="relative h-full flex flex-col justify-between p-9">
              <div className="flex flex-col gap-6">
                <div className="text-base font-medium text-foreground">New component</div>
                <h3 className="text-[56px] font-normal leading-none tracking-[-0.56px] text-foreground">Skeleton Loader</h3>
              </div>

              <a href="#" className="inline-flex items-center gap-1 px-3.5 py-2 rounded-[30px] text-base font-medium text-foreground self-start" style={{
                backgroundImage: 'linear-gradient(105.255deg, rgba(255, 255, 255, 0.6) 0.965%, rgba(255, 255, 255, 0.8) 91.7%)'
              }}>
                Learn more
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M17.625 7.61816C19.4583 8.67664 19.4583 11.3234 17.625 12.3818L10.375 16.5674L9.625 15.2686L16.875 11.082C17.0292 10.993 17.1548 10.8793 17.252 10.75H1V9.25H17.252C17.1548 9.12055 17.0293 9.0061 16.875 8.91699L9.625 4.73145L10.375 3.43262L17.625 7.61816Z" fill="currentColor"/>
                </svg>
              </a>
            </div>

            {/* Skeleton Loader Preview - positioned on the right */}
            <img 
              src={skeletonLoaderPreview}
              alt="Skeleton Loader Component Preview" 
              className="absolute right-12 top-[157px] w-[576px] h-[315px] object-contain"
            />
          </div>
        </section>

        {/* Toolkits */}
        <section className="mb-16">
          <div className="pt-2.5 mb-6">
            <p className="text-sm font-medium text-[#2e2e2e]">Toolkits</p>
          </div>
          
          <div className="flex flex-col">
            <a href="#" className="flex items-center gap-7 py-6.5 border-t border-[#bcbcbc] hover:opacity-70 transition-opacity">
              <div className="bg-[#F5F5F5] p-2.5 rounded-[15px] shrink-0">
                <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12.0001 9.20008C12.0001 8.39911 11.9936 8.17343 11.961 8.00945C11.8031 7.21652 11.1836 6.59709 10.3907 6.43914C10.2267 6.40652 10.001 6.40008 9.20008 6.40008C8.39911 6.40008 8.17343 6.40652 8.00945 6.43914C7.21652 6.59709 6.59709 7.21652 6.43914 8.00945C6.40652 8.17343 6.40008 8.39911 6.40008 9.20008C6.40008 10.001 6.40652 10.2267 6.43914 10.3907C6.59709 11.1836 7.21652 11.8031 8.00945 11.961C8.17343 11.9936 8.39911 12.0001 9.20008 12.0001C10.001 12.0001 10.2267 11.9936 10.3907 11.961C11.1836 11.8031 11.8031 11.1836 11.961 10.3907C11.9936 10.2267 12.0001 10.001 12.0001 9.20008ZM14.4001 9.20008C14.4001 9.88571 14.4059 10.4038 14.3157 10.8579C13.9685 12.6033 12.6033 13.9685 10.8579 14.3157C10.4038 14.4059 9.88571 14.4001 9.20008 14.4001C8.51445 14.4001 7.99638 14.4059 7.54226 14.3157C5.79683 13.9685 4.43164 12.6033 4.08445 10.8579C3.99422 10.4038 4.00008 9.88571 4.00008 9.20008C4.00008 8.51445 3.99422 7.99638 4.08445 7.54226C4.43164 5.79683 5.79683 4.43164 7.54226 4.08445C7.99638 3.99422 8.51445 4.00008 9.20008 4.00008C9.88571 4.00008 10.4038 3.99422 10.8579 4.08445C12.6033 4.43164 13.9685 5.79683 14.3157 7.54226C14.4059 7.99638 14.4001 8.51445 14.4001 9.20008Z" fill="#545454"/>
                  <path d="M12.0001 22.8001C12.0001 21.9991 11.9936 21.7734 11.961 21.6095C11.8031 20.8165 11.1836 20.1971 10.3907 20.0391C10.2267 20.0065 10.001 20.0001 9.20008 20.0001C8.39911 20.0001 8.17343 20.0065 8.00945 20.0391C7.21652 20.1971 6.59709 20.8165 6.43914 21.6095C6.40652 21.7734 6.40008 21.9991 6.40008 22.8001C6.40008 23.601 6.40652 23.8267 6.43914 23.9907C6.59709 24.7836 7.21652 25.4031 8.00945 25.561C8.17343 25.5936 8.39911 25.6001 9.20008 25.6001C10.001 25.6001 10.2267 25.5936 10.3907 25.561C11.1836 25.4031 11.8031 24.7836 11.961 23.9907C11.9936 23.8267 12.0001 23.601 12.0001 22.8001ZM14.4001 22.8001C14.4001 23.4857 14.4059 24.0038 14.3157 24.4579C13.9685 26.2033 12.6033 27.5685 10.8579 27.9157C10.4038 28.0059 9.88571 28.0001 9.20008 28.0001C8.51445 28.0001 7.99638 28.0059 7.54226 27.9157C5.79683 27.5685 4.43164 26.2033 4.08445 24.4579C3.99422 24.0038 4.00008 23.4857 4.00008 22.8001C4.00008 22.1144 3.99422 21.5964 4.08445 21.1423C4.43164 19.3968 5.79683 18.0316 7.54226 17.6845C7.99638 17.5942 8.51445 17.6001 9.20008 17.6001C9.88571 17.6001 10.4038 17.5942 10.8579 17.6845C12.6033 18.0316 13.9685 19.3968 14.3157 21.1423C14.4059 21.5964 14.4001 22.1144 14.4001 22.8001Z" fill="#545454"/>
                  <path d="M25.6001 22.8001C25.6001 21.9991 25.5936 21.7734 25.561 21.6095C25.4031 20.8165 24.7836 20.1971 23.9907 20.0391C23.8267 20.0065 23.601 20.0001 22.8001 20.0001C21.9991 20.0001 21.7734 20.0065 21.6095 20.0391C20.8165 20.1971 20.1971 20.8165 20.0391 21.6095C20.0065 21.7734 20.0001 21.9991 20.0001 22.8001C20.0001 23.601 20.0065 23.8267 20.0391 23.9907C20.1971 24.7836 20.8165 25.4031 21.6095 25.561C21.7734 25.5936 21.9991 25.6001 22.8001 25.6001C23.601 25.6001 23.8267 25.5936 23.9907 25.561C24.7836 25.4031 25.4031 24.7836 25.561 23.9907C25.5936 23.8267 25.6001 23.601 25.6001 22.8001ZM28.0001 22.8001C28.0001 23.4857 28.0059 24.0038 27.9157 24.4579C27.5685 26.2033 26.2033 27.5685 24.4579 27.9157C24.0038 28.0059 23.4857 28.0001 22.8001 28.0001C22.1144 28.0001 21.5964 28.0059 21.1423 27.9157C19.3968 27.5685 18.0316 26.2033 17.6845 24.4579C17.5942 24.0038 17.6001 23.4857 17.6001 22.8001C17.6001 22.1144 17.5942 21.5964 17.6845 21.1423C18.0316 19.3968 19.3968 18.0316 21.1423 17.6845C21.5964 17.5942 22.1144 17.6001 22.8001 17.6001C23.4857 17.6001 24.0038 17.5942 24.4579 17.6845C26.2033 18.0316 27.5685 19.3968 27.9157 21.1423C28.0059 21.5964 28.0001 22.1144 28.0001 22.8001Z" fill="#545454"/>
                  <path d="M24.0001 4.40008V8.00008H27.6001V10.4001H24.0001V14.0001H21.6001V10.4001H18.0001V8.00008H21.6001V4.40008H24.0001Z" fill="#545454"/>
                </svg>
              </div>
              <span className="text-[32px] leading-8 text-foreground flex-1">Design libraries in Figma</span>
              <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" className="shrink-0">
                <path d="M28.2 12.1891C31.1333 13.8826 31.1333 18.1174 28.2 19.8109L16.6 26.5078L15.4 24.4297L27 17.7312C27.2467 17.5888 27.4477 17.407 27.6032 17.2H1.6V14.8H27.6032C27.4477 14.5929 27.2469 14.4098 27 14.2688L15.4 7.57032L16.6 5.49219L28.2 12.1891Z" fill="currentColor"/>
              </svg>
            </a>

            <a href="#" className="flex items-center gap-7 py-6.5 border-t border-[#bcbcbc] hover:opacity-70 transition-opacity">
              <div className="bg-[#F5F5F5] p-2.5 rounded-[15px] shrink-0">
                <svg width="32" height="32" viewBox="0 107 32 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M26.3984 110.4H28.4023C29.9485 110.401 31.202 111.654 31.2021 113.2V127.601C31.202 129.147 29.9485 130.4 28.4023 130.4H3.59766C2.05132 130.4 0.79698 129.147 0.796875 127.601V113.2C0.796981 111.654 2.05132 110.4 3.59766 110.4H12.7969C13.8609 110.4 14.8368 110.779 15.5977 111.407C16.8442 108.913 19.4208 107.2 22.3984 107.2H26.3984V110.4ZM3.59766 112.801C3.37681 112.801 3.19737 112.979 3.19727 113.2V127.601C3.19737 127.821 3.37681 128 3.59766 128H14.7969V114.801C14.7969 113.696 13.9014 112.801 12.7969 112.801H3.59766ZM26.3984 125.601H20.7988C19.2316 125.601 17.8987 126.602 17.4043 128H28.4023C28.623 128 28.8017 127.821 28.8018 127.601V113.2C28.8017 112.98 28.623 112.801 28.4023 112.801H26.3984V125.601ZM22.3984 109.601C19.5269 109.601 17.1994 111.928 17.1992 114.8V124.399C18.2019 123.646 19.4483 123.2 20.7988 123.2H23.999V109.601H22.3984ZM12.0039 124H5.60352V121.6H12.0039V124ZM12.0039 119.2H5.60352V116.8H12.0039V119.2Z" fill="#545454"/>
                </svg>
              </div>
              <span className="text-[32px] leading-8 text-foreground flex-1">Quick start guide for development</span>
              <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" className="shrink-0">
                <path d="M28.2 12.1891C31.1333 13.8826 31.1333 18.1174 28.2 19.8109L16.6 26.5078L15.4 24.4297L27 17.7312C27.2467 17.5888 27.4477 17.407 27.6032 17.2H1.6V14.8H27.6032C27.4477 14.5929 27.2469 14.4098 27 14.2688L15.4 7.57032L16.6 5.49219L28.2 12.1891Z" fill="currentColor"/>
              </svg>
            </a>

            <a href="#" className="flex items-center gap-7 py-6.5 border-t border-[#bcbcbc] hover:opacity-70 transition-opacity">
              <div className="bg-[#F5F5F5] p-2.5 rounded-[15px] shrink-0">
                <svg width="32" height="32" viewBox="0 212 32 28" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M27.2012 233.6H26.002V233.601C25.3395 233.601 24.8029 234.137 24.8027 234.8C24.8027 235.462 25.3394 236 26.002 236H27.2012V238.4H8.40137C6.41312 238.4 4.80078 236.788 4.80078 234.8C4.8008 234.665 4.80972 234.532 4.82422 234.4H4.80078V215.6C4.80099 213.612 6.41327 212 8.40137 212H27.2012V233.6ZM8.40137 233.6C7.73875 233.6 7.2014 234.137 7.20117 234.8C7.20117 235.463 7.7386 236 8.40137 236H22.6084C22.4757 235.625 22.4023 235.221 22.4023 234.8C22.4024 234.379 22.4756 233.975 22.6084 233.6H8.40137ZM8.40137 214.4C7.73876 214.4 7.20138 214.937 7.20117 215.6V231.409C7.57683 231.276 7.98017 231.2 8.40137 231.2H24.8008V214.4H8.40137ZM21.5996 224.801H11.1992V222.4H21.5996V224.801ZM21.5996 220H11.1992V217.6H21.5996V220Z" fill="#545454"/>
                </svg>
              </div>
              <span className="text-[32px] leading-8 text-foreground flex-1">Content standards for the product</span>
              <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" className="shrink-0">
                <path d="M28.2 12.1891C31.1333 13.8826 31.1333 18.1174 28.2 19.8109L16.6 26.5078L15.4 24.4297L27 17.7312C27.2467 17.5888 27.4477 17.407 27.6032 17.2H1.6V14.8H27.6032C27.4477 14.5929 27.2469 14.4098 27 14.2688L15.4 7.57032L16.6 5.49219L28.2 12.1891Z" fill="currentColor"/>
              </svg>
            </a>

            <a href="#" className="flex items-center gap-7 py-6.5 border-t border-[#bcbcbc] hover:opacity-70 transition-opacity">
              <div className="bg-[#F5F5F5] p-2.5 rounded-[15px] shrink-0">
                <svg width="32" height="32" viewBox="0 318 32 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M6.49121 330.889C8.2094 329.171 10.9947 329.171 12.7129 330.889L14.3027 332.478L14.0898 332.691C13.5668 333.214 13.1899 333.857 12.9834 334.553L11.0166 332.586C10.2357 331.805 8.96949 331.805 8.18848 332.586L4.80273 335.972V336.8H12.8008V337.2C12.8009 337.92 12.9753 338.6 13.2822 339.2L4.40234 339.201C3.2978 339.201 2.40234 338.306 2.40234 337.201V335.805C2.40267 335.275 2.61359 334.765 2.98828 334.391L6.49121 330.889ZM19.2881 330.889C21.0064 329.171 23.7915 329.17 25.5098 330.889L29.0137 334.392C29.3885 334.767 29.5996 335.275 29.5996 335.806V337.199C29.5996 338.303 28.7038 339.199 27.5996 339.199L17.1992 339.201C16.2614 339.201 15.477 338.555 15.2607 337.684C15.2594 337.678 15.2572 337.673 15.2559 337.667C15.2201 337.517 15.1993 337.362 15.1992 337.201V335.804C15.1995 335.274 15.4103 334.765 15.7852 334.39L19.2881 330.889ZM23.8135 332.585C23.0326 331.804 21.7664 331.804 20.9854 332.585L17.5996 335.971V336.799H27.1992V335.971L23.8135 332.585ZM9.60059 318.4C12.2515 318.4 14.4003 320.549 14.4004 323.2C14.4004 325.851 12.2516 328 9.60059 328C6.94971 328 4.80078 325.851 4.80078 323.2C4.80089 320.549 6.94977 318.4 9.60059 318.4ZM22.4014 318.4C25.0523 318.4 27.2011 320.549 27.2012 323.2C27.2012 325.851 25.0523 328 22.4014 328C19.7505 328 17.6016 325.851 17.6016 323.2C17.6017 320.549 19.7506 318.4 22.4014 318.4ZM9.60059 320.801C8.27526 320.801 7.20128 321.875 7.20117 323.2C7.20117 324.526 8.27519 325.6 9.60059 325.601C10.9261 325.601 12.001 324.526 12.001 323.2C12.0009 321.875 10.926 320.801 9.60059 320.801ZM22.4014 320.801C21.076 320.801 20.0021 321.875 20.002 323.2C20.002 324.526 21.076 325.6 22.4014 325.601C23.7269 325.601 24.8018 324.526 24.8018 323.2C24.8017 321.875 23.7268 320.801 22.4014 320.801Z" fill="#545454"/>
                </svg>
              </div>
              <span className="text-[32px] leading-8 text-foreground flex-1">Accessibility wiki</span>
              <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" className="shrink-0">
                <path d="M28.2 12.1891C31.1333 13.8826 31.1333 18.1174 28.2 19.8109L16.6 26.5078L15.4 24.4297L27 17.7312C27.2467 17.5888 27.4477 17.407 27.6032 17.2H1.6V14.8H27.6032C27.4477 14.5929 27.2469 14.4098 27 14.2688L15.4 7.57032L16.6 5.49219L28.2 12.1891Z" fill="currentColor"/>
              </svg>
            </a>
          </div>
        </section>

        {/* Support */}
        <section>
          <div className="border-t border-[#bcbcbc] pt-2.5 mb-6">
            <p className="text-sm font-medium text-[#2e2e2e]">Support</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <a href="#" className="bg-[#2e2e2e] h-[315px] rounded-3xl p-6 flex flex-col justify-between hover:opacity-90 transition-opacity">
              <div className="flex flex-col gap-12">
                <div className="backdrop-blur-sm inline-flex w-fit p-2.5 rounded-[15px] shadow-[0px_2.5px_22.5px_0px_rgba(0,0,0,0.1)]" style={{
                  background: 'rgba(255, 255, 255, 0.1)',
                  border: '1px solid transparent',
                  backgroundImage: 'linear-gradient(rgba(255, 255, 255, 0.1), rgba(255, 255, 255, 0.1)), linear-gradient(45deg, rgba(255, 255, 255, 0.08) 0%, rgba(255, 255, 255, 0.12) 49%, rgba(255, 255, 255, 0.06) 100%)',
                  backgroundOrigin: 'padding-box, border-box',
                  backgroundClip: 'padding-box, border-box'
                }}>
                  <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M16 5.59961C19.5346 5.59961 22.4 8.46499 22.4 11.9996H20C20 9.79047 18.2091 7.99961 16 7.99961V5.59961Z" fill="#F5F5F5"/>
                    <path d="M16.4795 0.799805C22.4006 0.800331 27.2006 5.60041 27.2012 11.5215C27.2012 13.3507 26.7332 15.1507 25.8418 16.748L23.5166 20.9141C22.7854 22.224 22.4014 23.7 22.4014 25.2002V26.4004H22.3926C22.3879 26.6285 22.3824 26.8394 22.3691 27.0332C22.3345 27.5403 22.2597 28.0199 22.0674 28.4844C21.6208 29.5623 20.7634 30.4196 19.6855 30.8662C19.2211 31.0585 18.7415 31.1324 18.2344 31.167C17.7378 31.2009 17.1305 31.2002 16.4014 31.2002H15.6016C14.8725 31.2002 14.2651 31.2009 13.7686 31.167C13.2615 31.1324 12.7818 31.0585 12.3174 30.8662C11.2395 30.4196 10.3821 29.5623 9.93555 28.4844C9.74324 28.02 9.66939 27.5403 9.63477 27.0332C9.62154 26.8394 9.61507 26.6285 9.61035 26.4004H9.60059V25.2002C9.60059 23.7 9.21651 22.224 8.48535 20.9141L6.16016 16.748C5.26871 15.1507 4.80078 13.3507 4.80078 11.5215C4.80131 5.60041 9.60138 0.800331 15.5225 0.799805H16.4795ZM12.0107 26.4004C12.0149 26.5749 12.0198 26.7293 12.0293 26.8691C12.0556 27.2539 12.1022 27.442 12.1533 27.5654C12.3563 28.0555 12.7463 28.4454 13.2363 28.6484C13.3598 28.6995 13.5479 28.7462 13.9326 28.7725C14.3285 28.7994 14.8399 28.7998 15.6016 28.7998H16.4014C17.163 28.7998 17.6744 28.7994 18.0703 28.7725C18.4555 28.7462 18.6441 28.6996 18.7676 28.6484C19.2574 28.4454 19.6467 28.0554 19.8496 27.5654C19.9007 27.442 19.9474 27.254 19.9736 26.8691C19.9832 26.7293 19.989 26.5749 19.9932 26.4004H12.0107ZM15.5225 3.2002C10.9269 3.20072 7.2017 6.92589 7.20117 11.5215C7.20117 12.9412 7.56405 14.3384 8.25586 15.5781L10.582 19.7451C11.3166 21.0614 11.7718 22.5095 11.9326 24H20.0693C20.2301 22.5095 20.6854 21.0614 21.4199 19.7451L23.7461 15.5781C24.4379 14.3384 24.8008 12.9412 24.8008 11.5215C24.8003 6.92589 21.0751 3.20072 16.4795 3.2002H15.5225Z" fill="#F5F5F5"/>
                  </svg>
                </div>
                <div className="flex flex-col gap-3">
                  <h3 className="text-[28px] leading-8 font-medium text-white">Make a request</h3>
                  <p className="text-base leading-6 text-[#d9d9d9]">
                    Request new assets or share feedback about how we can improve the design system.
                  </p>
                </div>
              </div>
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M17.625 7.61816C19.4583 8.67664 19.4583 11.3234 17.625 12.3818L10.375 16.5674L9.625 15.2686L16.875 11.082C17.0292 10.993 17.1548 10.8793 17.252 10.75H1V9.25H17.252C17.1548 9.12055 17.0293 9.0061 16.875 8.91699L9.625 4.73145L10.375 3.43262L17.625 7.61816Z" fill="#F5F5F5"/>
              </svg>
            </a>

            <a href="#" className="bg-[#2e2e2e] h-[315px] rounded-3xl p-6 flex flex-col justify-between hover:opacity-90 transition-opacity">
              <div className="flex flex-col gap-12">
                <div className="backdrop-blur-sm inline-flex w-fit p-2.5 rounded-[15px] shadow-[0px_2.5px_22.5px_0px_rgba(0,0,0,0.1)]" style={{
                  background: 'rgba(255, 255, 255, 0.1)',
                  border: '1px solid transparent',
                  backgroundImage: 'linear-gradient(rgba(255, 255, 255, 0.1), rgba(255, 255, 255, 0.1)), linear-gradient(45deg, rgba(255, 255, 255, 0.08) 0%, rgba(255, 255, 255, 0.12) 49%, rgba(255, 255, 255, 0.06) 100%)',
                  backgroundOrigin: 'padding-box, border-box',
                  backgroundClip: 'padding-box, border-box'
                }}>
                  <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M395.331 20.0002C396.215 20.0002 396.931 20.7165 396.931 21.6002C396.931 22.4839 396.215 23.2002 395.331 23.2002C394.448 23.2002 393.731 22.4839 393.731 21.6002C393.731 20.7165 394.448 20.0002 395.331 20.0002Z" fill="#F5F5F5" transform="translate(-379.331, 0)"/>
                    <path d="M395.331 8.8002C397.773 8.8002 400.131 10.495 400.131 13.0127C400.131 14.5771 399.173 16.0392 397.863 16.8611C397.452 17.1189 397.093 17.4037 396.848 17.6971C396.608 17.9856 396.531 18.215 396.531 18.4002H394.131C394.131 17.481 394.534 16.7259 395.006 16.1596C395.474 15.5982 396.063 15.1574 396.588 14.8283C397.325 14.3658 397.731 13.6118 397.731 13.0127C397.731 12.2037 396.866 11.2002 395.331 11.2002C393.796 11.2002 392.931 12.2037 392.931 13.0127H390.531C390.531 10.495 392.89 8.8002 395.331 8.8002Z" fill="#F5F5F5" transform="translate(-379.331, 0)"/>
                    <path fillRule="evenodd" clipRule="evenodd" d="M395.331 3.2002C397.731 3.2002 399.627 3.19831 401.13 3.35957C402.653 3.5231 403.917 3.86606 404.998 4.65176C405.644 5.1205 406.211 5.68785 406.68 6.33301C407.465 7.41443 407.808 8.67848 407.972 10.2018C408.133 11.7042 408.131 13.6003 408.131 16.0002C408.131 18.4001 408.133 20.2962 407.972 21.7986C407.808 23.3219 407.465 24.586 406.68 25.6674C406.211 26.3125 405.644 26.8799 404.998 27.3486C403.917 28.1343 402.653 28.4773 401.13 28.6408C399.627 28.8021 397.731 28.8002 395.331 28.8002C392.931 28.8002 391.035 28.8021 389.533 28.6408C388.01 28.4773 386.745 28.1343 385.664 27.3486C385.019 26.8799 384.452 26.3125 383.983 25.6674C383.197 24.586 382.854 23.3219 382.691 21.7986C382.529 20.2962 382.531 18.4001 382.531 16.0002C382.531 13.6003 382.529 11.7042 382.691 10.2018C382.854 8.67848 383.197 7.41443 383.983 6.33301C384.452 5.68785 385.019 5.1205 385.664 4.65176C386.745 3.86606 388.01 3.5231 389.533 3.35957C391.035 3.19831 392.931 3.2002 395.331 3.2002ZM395.331 5.6002C392.878 5.6002 391.134 5.60119 389.789 5.74551C388.466 5.88758 387.676 6.15746 387.075 6.59395C386.634 6.91462 386.246 7.30261 385.925 7.74395C385.489 8.34471 385.219 9.13456 385.077 10.458C384.932 11.8026 384.931 13.5471 384.931 16.0002C384.931 18.4532 384.932 20.1978 385.077 21.5424C385.219 22.8658 385.489 23.6557 385.925 24.2564C386.246 24.6978 386.634 25.0858 387.075 25.4064C387.676 25.8429 388.466 26.1128 389.789 26.2549C391.134 26.3992 392.878 26.4002 395.331 26.4002C397.784 26.4002 399.529 26.3992 400.873 26.2549C402.197 26.1128 402.987 25.8429 403.587 25.4064C404.029 25.0858 404.417 24.6978 404.738 24.2564C405.174 23.6557 405.444 22.8658 405.586 21.5424C405.73 20.1978 405.731 18.4532 405.731 16.0002C405.731 13.5471 405.73 11.8026 405.586 10.458C405.444 9.13456 405.174 8.34471 404.738 7.74395C404.417 7.30261 404.029 6.91462 403.587 6.59395C402.987 6.15746 402.197 5.88758 400.873 5.74551C399.529 5.60119 397.784 5.6002 395.331 5.6002Z" fill="#F5F5F5" transform="translate(-379.331, 0)"/>
                  </svg>
                </div>
                <div className="flex flex-col gap-3">
                  <h3 className="text-[28px] leading-8 font-medium text-white">Get help</h3>
                  <p className="text-base leading-6 text-[#d9d9d9]">
                    Learn where to ask questions and how to sign up for office hours.
                  </p>
                </div>
              </div>
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M17.625 7.61816C19.4583 8.67664 19.4583 11.3234 17.625 12.3818L10.375 16.5674L9.625 15.2686L16.875 11.082C17.0292 10.993 17.1548 10.8793 17.252 10.75H1V9.25H17.252C17.1548 9.12055 17.0293 9.0061 16.875 8.91699L9.625 4.73145L10.375 3.43262L17.625 7.61816Z" fill="#F5F5F5"/>
              </svg>
            </a>

            <a href="#" className="bg-[#2e2e2e] h-[315px] rounded-3xl p-6 flex flex-col justify-between hover:opacity-90 transition-opacity">
              <div className="flex flex-col gap-12">
                <div className="backdrop-blur-sm inline-flex w-fit p-2.5 rounded-[15px] shadow-[0px_2.5px_22.5px_0px_rgba(0,0,0,0.1)]" style={{
                  background: 'rgba(255, 255, 255, 0.1)',
                  border: '1px solid transparent',
                  backgroundImage: 'linear-gradient(rgba(255, 255, 255, 0.1), rgba(255, 255, 255, 0.1)), linear-gradient(45deg, rgba(255, 255, 255, 0.08) 0%, rgba(255, 255, 255, 0.12) 49%, rgba(255, 255, 255, 0.06) 100%)',
                  backgroundOrigin: 'padding-box, border-box',
                  backgroundClip: 'padding-box, border-box'
                }}>
                  <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M776.535 6.98711C777.749 4.8931 780.433 4.17911 782.53 5.38555L784.873 6.73398C786.972 7.94186 787.695 10.6203 786.48 12.7168L779.332 25.0543C778.946 25.72 778.391 26.2721 777.724 26.6559L776.779 27.1996H787.47V29.5996H771.87C770.411 29.5996 769.07 28.4404 769.07 26.8074V21.048C769.07 20.2787 769.273 19.5232 769.659 18.8574L776.535 6.98711ZM771.735 20.0605C771.561 20.3611 771.47 20.7016 771.47 21.048V26.8074C771.47 27.1003 771.794 27.2996 772.063 27.1449L776.527 24.5762C776.83 24.4021 777.081 24.1518 777.255 23.8512L782.404 14.9637L776.616 11.634L771.735 20.0605ZM781.334 7.4668C780.38 6.91791 779.16 7.2441 778.612 8.19023L777.82 9.55586L783.607 12.8871L784.404 11.5137C784.95 10.57 784.627 9.36108 783.676 8.81367L781.334 7.4668Z" fill="#F5F5F5" transform="translate(-760, 0)"/>
                    <path d="M764.27 12.7996C764.27 14.1251 765.344 15.1996 766.67 15.1996V16.7996C765.344 16.7996 764.27 17.8741 764.27 19.1996H762.67C762.67 17.8741 761.595 16.7996 760.27 16.7996V15.1996C761.595 15.1996 762.67 14.1251 762.67 12.7996H764.27Z" fill="#F5F5F5" transform="translate(-760, 0)"/>
                    <path d="M769.07 1.59961C769.07 3.80875 770.86 5.59961 773.07 5.59961V7.19961C770.86 7.19961 769.07 8.99047 769.07 11.1996H767.47C767.47 8.99047 765.679 7.19961 763.47 7.19961V5.59961C765.679 5.59961 767.47 3.80875 767.47 1.59961H769.07Z" fill="#F5F5F5" transform="translate(-760, 0)"/>
                  </svg>
                </div>
                <div className="flex flex-col gap-3">
                  <h3 className="text-[28px] leading-8 font-medium text-white">Playground</h3>
                  <p className="text-base leading-6 text-[#d9d9d9]">
                    Tinker with components or add your pet to the Granimals sample app.
                  </p>
                </div>
              </div>
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M17.625 7.61816C19.4583 8.67664 19.4583 11.3234 17.625 12.3818L10.375 16.5674L9.625 15.2686L16.875 11.082C17.0292 10.993 17.1548 10.8793 17.252 10.75H1V9.25H17.252C17.1548 9.12055 17.0293 9.0061 16.875 8.91699L9.625 4.73145L10.375 3.43262L17.625 7.61816Z" fill="#F5F5F5"/>
              </svg>
            </a>
          </div>
        </section>
      </div>
    </div>
  );
}


