import { Link } from 'react-router-dom';

export function BrandLogoPage() {
  return (
    <div className="min-h-screen bg-white animate-fade-in">
      <div className="container mx-auto px-6 pt-12 pb-12">
        <div className="mb-8">
          <Link 
            to="/brand" 
            className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground mb-4"
          >
            <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back to Brand
          </Link>
          <h1 className="text-3xl font-bold tracking-tight mb-2">Logo</h1>
          <p className="text-muted-foreground">
            Brand marks, lockups, and usage guidelines for consistent representation.
          </p>
        </div>

        <div className="rounded-xl border border-border/50 bg-muted/30 p-12">
          <div className="flex flex-col items-center justify-center py-12 text-center">
            <div className="mb-8 flex h-32 w-32 items-center justify-center rounded-2xl bg-white border border-border/50">
              <svg width="64" height="64" viewBox="0 0 111 22" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-foreground">
                <path d="M9.97852 0C16.7707 7.42797e-05 19.9561 3.48645 19.9561 11C19.956 18.5135 16.7707 21.9999 9.97852 22C3.18621 22 1.46999e-05 18.5136 0 11C0 3.48637 3.1862 0 9.97852 0ZM66.9375 0C72.9785 0 76.0744 2.46465 76.7656 7.93457H71.8965C71.3555 5.4701 69.9129 4.35742 66.9375 4.35742C63.3311 4.35748 61.7988 6.22141 61.7988 11C61.7988 15.8086 63.3311 17.6415 66.9375 17.6416C69.9129 17.6416 71.536 16.4098 71.9268 13.5547H65.1045V9.94824H76.8857V11.2705C76.8857 18.7841 73.4894 22 66.9375 22C60.1453 21.9999 56.96 18.5135 56.96 11C56.96 3.48644 60.1453 5.98633e-05 66.9375 0ZM34.7227 0.480469C36.2053 0.480495 37.5076 0.756736 38.6299 1.30762C39.7514 1.85898 40.623 2.64995 41.2441 3.68164C41.8649 4.71373 42.1758 5.93053 42.1758 7.33301C42.1758 8.73549 41.865 9.79049 41.2441 10.8223C40.6229 11.8544 39.4965 12.7161 38.3359 13.2012C38.129 13.2876 37.6843 13.4426 37.0879 13.6396L42.4541 21.501H36.6973L32.4111 15.1182C31.3493 15.4465 30.3054 15.7665 29.4287 16.0342V21.5186H24.5996V0.480469H34.7227ZM52.2168 21.5186H47.3779V0.480469H52.2168V21.5186ZM86.4795 21.5186H81.6406V0.480469H86.4795V21.5186ZM105.706 14.1855V0.480469H110.424V21.5186H105.585L96.8994 7.81445V21.5186H92.1807V0.480469H97.0195L105.706 14.1855ZM9.97852 4.35742C6.37198 4.35742 4.83887 6.19128 4.83887 11C4.83888 15.8087 6.37199 17.6416 9.97852 17.6416C13.6149 17.6415 15.1172 15.8086 15.1172 11C15.1172 6.19137 13.615 4.35749 9.97852 4.35742ZM29.4287 5.13867V11.3223C31.6834 10.7504 34.8855 9.92228 35.6396 9.64355C36.1607 9.45085 37.4795 9.01214 37.4795 7.33301C37.4795 5.3261 35.4902 5.13867 34.2354 5.13867H29.4287Z" fill="currentColor"/>
              </svg>
            </div>
            <h3 className="text-xl font-semibold mb-3">Logo Assets Coming Soon</h3>
            <p className="text-sm text-muted-foreground max-w-md mb-6">
              This section will include downloadable logo files, usage guidelines, clear space rules, and co-branding specifications.
            </p>
            <div className="flex flex-wrap gap-2 justify-center text-xs text-muted-foreground">
              <span className="bg-muted px-3 py-1 rounded-full">Wordmarks</span>
              <span className="bg-muted px-3 py-1 rounded-full">Lockups</span>
              <span className="bg-muted px-3 py-1 rounded-full">App Icons</span>
              <span className="bg-muted px-3 py-1 rounded-full">Social Assets</span>
              <span className="bg-muted px-3 py-1 rounded-full">Clear Space</span>
              <span className="bg-muted px-3 py-1 rounded-full">Do's & Don'ts</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}


