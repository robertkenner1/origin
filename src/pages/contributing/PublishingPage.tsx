export function PublishingPage() {
  return (
    <div className="w-full px-6 py-12">
      <div className="prose prose-sm max-w-none">
          <h1>Publish components through the Origin Figma library</h1>
          <p>
            This page details the process for designers to add and publish components to the Origin 
            Design Toolkit.
          </p>

          <h2>Why this matters</h2>
          <p>
            We've seen multiple independently creating similar components in isolated files, which 
            leads to:
          </p>
          <ul>
            <li>Confusion around the source of truth</li>
            <li>Duplicate effort across teams</li>
            <li>Inconsistent naming and implementation</li>
          </ul>
          <p>
            We're opening the Origin library to teams — with clear structure and publishing rules — 
            so we can get build together, stay aligned, and move faster. We hope that this process 
            fosters better cross-team collaboration and reduces duplication across Figma files.
          </p>

          <h2>Page Levels & Permissions</h2>
          <p>
            Each page in the Figma library is now divided into sections to clarify ownership and 
            editing permissions:
          </p>
          
          <h3>Origin Library</h3>
          <p><strong>Variables, Text Styles, and Elevation</strong></p>
          <p className="text-sm">🔒 Only editable by Origin team.</p>
          
          <p><strong>Pages with 'ID-' prefix, such as system components</strong></p>
          <p className="text-sm">🔒 Only editable by Origin team.</p>
          
          <h3>Open to contributions?</h3>
          <p><strong>Team Assets (not in Origin code)</strong></p>
          <p className="text-sm">
            ✅ Fully open, and contributions welcome. Please{' '}
            <a href="#" className="text-primary hover:underline">create a Figma Branch</a> when 
            adding your component to the file.
          </p>

          <h2>How to add your component to the Design toolkit using Figma Branching</h2>
          <p>If you want to propose a change or add a component to the toolkit, follow this process:</p>
          
          <div className="my-6 flex items-center gap-4 not-prose">
            <div className="px-4 py-2 rounded-lg bg-purple-100 text-purple-900 font-medium">
              Create a branch
            </div>
            <span>→</span>
            <div className="px-4 py-2 rounded-lg bg-purple-100 text-purple-900 font-medium">
              Edit in branch
            </div>
            <span>→</span>
            <div className="px-4 py-2 rounded-lg bg-purple-100 text-purple-900 font-medium">
              Request review
            </div>
            <span>→</span>
            <div className="px-4 py-2 rounded-lg bg-purple-100 text-purple-900 font-medium">
              Merge branch
            </div>
            <span>→</span>
            <div className="px-4 py-2 rounded-lg bg-green-100 text-green-900 font-medium">
              Publish library
            </div>
          </div>

          <ol>
            <li>
              <strong>Create a branch</strong> in Figma from the Origin file.
            </li>
            <li>Use the existing pages under 'team asset' section.</li>
            <li>If none of the page fit your component needs, create a new page.</li>
            <li>
              Make your edits or add new components — use the template provided to organize your 
              component.
            </li>
            <li>Submit your changes to your teammates for review.</li>
            <li>Merge your branch into main.</li>
            <li>
              When publishing, ensure the following:
              <ul>
                <li>Uncheck all changes</li>
                <li>
                  Select only the components with changes
                  <p className="text-sm">
                    Make sure you don't select anything from the variables and/or components from 
                    Origin design system — those must be published by the Origin team to maintain 
                    system integrity.
                  </p>
                </li>
              </ul>
            </li>
          </ol>

          <h2>Frequently Asked Questions (FAQ)</h2>
          <p>
            A list of common questions encountered when contributing to the Origin design system.
          </p>

          <h3>How do I move components to the Origin Design Toolkit without losing the connection?</h3>
          <ol>
            <li>Create a branch in Figma from the Origin file.</li>
            <li>"Cut" (command+X) the components that you wish to move.</li>
            <li>"Paste" (command+V) the changes into the branch you created.</li>
          </ol>

          <h3>When should a team move their components into the Design Toolkit (Origin) file?</h3>
          <p>
            We recommend notice that they've been using the same component repeatedly across projects, 
            that's a strong signal to move the component into the shared Design Toolkit file. We 
            recommend moving components once a design is shipped to production.
          </p>
          <p>
            The shared file should be a place that promotes cross-team collaboration, promotes 
            consistency, and keeps the Origin library as the single source of truth.
          </p>

          <h3>When does a component become part of the Origin system?</h3>
          <p>
            Components in the "team asset" section are considered candidates for inclusion in the 
            Origin design system. These are often components created for specific product needs, but 
            that show signs of broader relevance and reusability.
          </p>
          <p>A component is ready to be considered for inclusion in Origin when:</p>
          <ul>
            <li>It's used consistently across multiple projects or teams.</li>
            <li>It has a shared design or interaction pattern.</li>
          </ul>
          <p>
            Once a component shows repeated use and system alignment, the Design Systems team will 
            evaluate it for graduation into Origin, where it becomes universally available, scalable, 
            and worth maintaining at the system level.
          </p>
          <p>
            If you think a component in Team Assets is ready to graduate, bring it to{' '}
            <a href="#" className="text-primary hover:underline">office hours</a> or drop a note in{' '}
            <a href="#" className="text-primary hover:underline">#ask-origin-design-system</a> to 
            start the conversation.
          </p>

          <h2>Need More Help?</h2>
          <ul>
            <li>
              Questions? Suggestions? Drop into{' '}
              <a href="#" className="text-primary hover:underline">#ask-origin-design-system</a>.
            </li>
            <li>
              Not sure what level something belongs in? Ask in Slack or try the Origin team in your 
              branch.
            </li>
          </ul>
          <p>Let's build a better, more connected design system — together!</p>
        </div>
    </div>
  );
}
