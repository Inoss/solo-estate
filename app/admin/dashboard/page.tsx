import { auth } from "@/auth"
import { prisma } from "@/lib/db"
import { Building2, Users, FileText, TrendingUp } from "lucide-react"

async function getStats() {
  const [projectsCount, developersCount, articlesCount] = await Promise.all([
    prisma.project.count(),
    prisma.developer.count(),
    prisma.article.count(),
  ])

  return {
    projects: projectsCount,
    developers: developersCount,
    articles: articlesCount,
  }
}

export default async function DashboardPage() {
  const session = await auth()
  const stats = await getStats()

  return (
    <div className="p-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-slate-900">Dashboard</h1>
        <p className="text-slate-600 mt-1">
          Welcome back, {session?.user?.name || "Admin"}
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <StatCard
          title="Total Projects"
          value={stats.projects}
          icon={Building2}
          color="blue"
        />
        <StatCard
          title="Developers"
          value={stats.developers}
          icon={Users}
          color="green"
        />
        <StatCard
          title="Articles"
          value={stats.articles}
          icon={FileText}
          color="purple"
        />
        <StatCard
          title="Growth"
          value="+12%"
          icon={TrendingUp}
          color="orange"
        />
      </div>

      {/* Quick Actions */}
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-xl font-semibold text-slate-900 mb-4">
          Quick Actions
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <QuickActionCard
            title="Add New Project"
            description="Create a new property listing"
            href="/admin/projects/new"
          />
          <QuickActionCard
            title="Add Developer"
            description="Register a new developer"
            href="/admin/developers/new"
          />
          <QuickActionCard
            title="Write Article"
            description="Publish a new blog post"
            href="/admin/articles/new"
          />
        </div>
      </div>
    </div>
  )
}

function StatCard({
  title,
  value,
  icon: Icon,
  color,
}: {
  title: string
  value: number | string
  icon: any
  color: "blue" | "green" | "purple" | "orange"
}) {
  const colorClasses = {
    blue: "bg-blue-500",
    green: "bg-green-500",
    purple: "bg-purple-500",
    orange: "bg-orange-500",
  }

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-slate-600">{title}</p>
          <p className="text-3xl font-bold text-slate-900 mt-2">{value}</p>
        </div>
        <div className={`${colorClasses[color]} p-3 rounded-lg`}>
          <Icon className="h-6 w-6 text-white" />
        </div>
      </div>
    </div>
  )
}

function QuickActionCard({
  title,
  description,
  href,
}: {
  title: string
  description: string
  href: string
}) {
  return (
    <a
      href={href}
      className="block p-4 border border-slate-200 rounded-lg hover:border-blue-500 hover:bg-blue-50 transition"
    >
      <h3 className="font-semibold text-slate-900 mb-1">{title}</h3>
      <p className="text-sm text-slate-600">{description}</p>
    </a>
  )
}
