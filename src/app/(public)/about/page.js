import { Github, Linkedin, Globe } from 'lucide-react';

export default function AboutPage() {
  return (
    <div className="min-h-[80vh] flex justify-center bg-gradient-to-br from-zinc-100 to-zinc-300 dark:from-zinc-900 dark:to-zinc-800 p-6">
      <div className="max-w-3xl w-full bg-white/10 dark:bg-zinc-800/60 shadow-xl rounded-2xl p-8 space-y-8 border border-zinc-300 dark:border-zinc-700">
        {/* Header Section */}
        <div className="text-center space-y-3">
          <h1 className="text-4xl font-extrabold text-teal-500">About Us</h1>
          <p className="text-lg text-zinc-700 dark:text-zinc-300">
            Note Keep is a simple note-taking app for performing CRUD operations
            on notes. It offers a clean UI along with rich features such as a
            text editor, OAuth authentication, email support, and an admin
            panel. This project was created as a capstone for learning Next.js
            alongside popular libraries. You can refer to the app's code from
            the link below and use it for your own use case.
          </p>
        </div>

        {/* Tech Stack Section */}
        <div>
          <h2 className="text-2xl font-semibold text-teal-500">Tech Stack</h2>
          <div className="flex flex-wrap gap-3 mt-4">
            {[
              'Next.js',
              'NextAuth',
              'ShadCN UI',
              'Tailwind CSS',
              'MongoDB',
              'Cloudinary',
              'React',
              'Nodemailer',
              'Tiptap',
              'Zod'
            ].map((tech, index) => (
              <span
                key={index}
                className="px-3 py-1 text-sm font-medium rounded-lg bg-zinc-200 dark:bg-zinc-700 text-zinc-800 dark:text-zinc-300 shadow-md transition-transform hover:scale-105"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>

        {/* Creator Section */}
        <div className="text-center">
          <h2 className="text-2xl font-semibold text-teal-500">
            Meet the Creator
          </h2>
          <div className="mt-4 flex flex-col items-center">
            <img
              src="https://avatars.githubusercontent.com/u/143305812?s=400&u=9406db4e57ed492cb18f46509ddd6c3e14fc501c&v=4"
              alt="Creator Avatar"
              className="w-24 h-24 rounded-full shadow-lg border-4 border-teal-500"
            />
            <p className="mt-3 text-lg font-semibold text-zinc-800 dark:text-zinc-200">
              Utkarsh Tiwari
            </p>
            <p className="text-sm text-zinc-600 dark:text-zinc-400">
              A passionate web developer & coding enthusiast 🚀
            </p>

            {/* Social Links */}
            <div className="flex gap-4 mt-4">
              <a
                href="https://github.com/imutkarsht"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-teal-500 hover:text-teal-400 transition hover:scale-110"
              >
                <Github size={20} />
                GitHub
              </a>

              <a
                href="https://linkedin.com/in/imutkarsht"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-teal-500 hover:text-teal-400 transition hover:scale-110"
              >
                <Linkedin size={20} />
                LinkedIn
              </a>

              <a
                href="https://imutkarsht-portfolio.vercel.app"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-teal-500 hover:text-teal-400 transition hover:scale-110"
              >
                <Globe size={20} />
                Portfolio
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
