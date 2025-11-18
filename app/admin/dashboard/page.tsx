import { auth } from "@/auth"
import { prisma } from "@/lib/db"
import { Building2, Users, FileText, TrendingUp, ArrowUpRight } from "lucide-react"
import Link from "next/link"

async function getStats() {
  const [projectsCount, developersCount, articlesCount, publishedProjects, leadsCount] = await Promise.all([
    prisma.project.count(),
    prisma.developer.count(),
    prisma.article.count(),
    prisma.project.count({ where: { published: true } }),
    prisma.lead.count(),
  ])

  // Get recent projects
  const recentProjects = await prisma.project.findMany({
    take: 5,
    orderBy: { createdAt: 'desc' },
    select: {
      id: true,
      titleEn: true,
      slug: true,
      published: true,
      createdAt: true,
      price: true,
    },
  })

  // Get recent leads
  const recentLeads = await prisma.lead.findMany({
    take: 5,
    orderBy: { createdAt: 'desc' },
    select: {
      id: true,
      phone: true,
      source: true,
      locale: true,
      createdAt: true,
    },
  })

  return {
    projects: projectsCount,
    developers: developersCount,
    articles: articlesCount,
    publishedProjects,
    leads: leadsCount,
    recentProjects,
    recentLeads,
  }
}

export default async function DashboardPage() {
  const session = await auth()
  const stats = await getStats()

  const getCurrentGreeting = () => {
    const hour = new Date().getHours()
    if (hour < 12) return "Good morning"
    if (hour < 18) return "Good afternoon"
    return "Good evening"
  }

  return (
    <div className="p-8">
      {/* Welcome Section */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-slate-900 mb-2">
          {getCurrentGreeting()}, {session?.user?.name || "Admin"}! 👋
        </h1>
        <p className="text-slate-600">
          Here's what's happening with your real estate platform today.
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <StatCard
          title="Total Projects"
          value={stats.projects}
          subtitle={`${stats.publishedProjects} Published`}
          icon={Building2}
          gradient="from-blue-500 to-blue-600"
          href="/admin/projects"
        />
        <StatCard
          title="Developers"
          value={stats.developers}
          subtitle="Active Partners"
          icon={Users}
          gradient="from-green-500 to-emerald-600"
          href="/admin/developers"
        />
        <StatCard
          title="Articles"
          value={stats.articles}
          subtitle="Blog Posts"
          icon={FileText}
          gradient="from-purple-500 to-purple-600"
          href="/admin/articles"
        />
        <StatCard
          title="Leads"
          value={stats.leads}
          subtitle="Total Inquiries"
          icon={TrendingUp}
          gradient="from-orange-500 to-amber-600"
          href="/admin/leads"
        />
      </div>

      {/* Quick Actions */}
      <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 mb-8">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold text-slate-900">Quick Actions</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <QuickActionCard
            title="Add New Project"
            description="Create a new property listing"
            href="/admin/projects/new"
            icon={Building2}
            gradient="from-blue-500 to-blue-600"
          />
          <QuickActionCard
            title="Add Developer"
            description="Register a new developer"
            href="/admin/developers/new"
            icon={Users}
            gradient="from-green-500 to-emerald-600"
          />
          <QuickActionCard
            title="Write Article"
            description="Publish a new blog post"
            href="/admin/articles/new"
            icon={FileText}
            gradient="from-purple-500 to-purple-600"
          />
        </div>
      </div>

      {/* Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Projects */}
        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold text-slate-900">Recent Projects</h2>
            <Link
              href="/admin/projects"
              className="text-sm text-blue-600 hover:text-blue-700 font-medium flex items-center gap-1"
            >
              View All
              <ArrowUpRight className="w-4 h-4" />
            </Link>
          </div>
          <div className="space-y-3">
            {stats.recentProjects.length > 0 ? (
              stats.recentProjects.map((project) => (
                <Link
                  key={project.id}
                  href={`/admin/projects/${project.id}`}
                  className="flex items-center justify-between p-4 rounded-xl hover:bg-slate-50 transition-colors border border-slate-100 group"
                >
                  <div className="flex items-center gap-3 flex-1 min-w-0">
                    <div className="p-2 bg-blue-100 rounded-lg group-hover:bg-blue-200 transition-colors">
                      <Building2 className="w-5 h-5 text-blue-600" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-slate-900 truncate group-hover:text-blue-600 transition-colors">
                        {project.titleEn}
                      </p>
                      <p className="text-sm text-slate-500">
                        ${project.price.toLocaleString()} • {new Date(project.createdAt).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-medium ${
                      project.published
                        ? "bg-green-100 text-green-700"
                        : "bg-yellow-100 text-yellow-700"
                    }`}
                  >
                    {project.published ? "Published" : "Draft"}
                  </span>
                </Link>
              ))
            ) : (
              <p className="text-center text-slate-500 py-8">No projects yet</p>
            )}
          </div>
        </div>

        {/* Recent Leads */}
        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold text-slate-900">Recent Leads</h2>
            <Link
              href="/admin/leads"
              className="text-sm text-purple-600 hover:text-purple-700 font-medium flex items-center gap-1"
            >
              View All
              <ArrowUpRight className="w-4 h-4" />
            </Link>
          </div>
          <div className="space-y-3">
            {stats.recentLeads.length > 0 ? (
              stats.recentLeads.map((lead) => (
                <div
                  key={lead.id}
                  className="flex items-center justify-between p-4 rounded-xl border border-slate-100"
                >
                  <div className="flex items-center gap-3 flex-1 min-w-0">
                    <div className="p-2 bg-purple-100 rounded-lg">
                      <TrendingUp className="w-5 h-5 text-purple-600" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-slate-900 truncate">
                        {lead.phone}
                      </p>
                      <p className="text-sm text-slate-500">
                        {lead.source} • {new Date(lead.createdAt).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                  <span className="px-3 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-700">
                    {lead.locale.toUpperCase()}
                  </span>
                </div>
              ))
            ) : (
              <p className="text-center text-slate-500 py-8">No leads yet</p>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

function StatCard({
  title,
  value,
  subtitle,
  icon: Icon,
  gradient,
  href,
}: {
  title: string
  value: number | string
  subtitle: string
  icon: any
  gradient: string
  href: string
}) {
  return (
    <Link href={href} className="group">
      <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 hover:shadow-lg transition-all duration-300 group-hover:scale-105">
        <div className="flex items-start justify-between mb-4">
          <div className={`p-3 rounded-xl bg-gradient-to-br ${gradient}`}>
            <Icon className="h-6 w-6 text-white" />
          </div>
        </div>
        <div>
          <p className="text-sm font-medium text-slate-600 mb-1">{title}</p>
          <p className="text-3xl font-bold text-slate-900 mb-1">{value}</p>
          <p className="text-sm text-slate-500">{subtitle}</p>
        </div>
      </div>
    </Link>
  )
}

function QuickActionCard({
  title,
  description,
  href,
  icon: Icon,
  gradient,
}: {
  title: string
  description: string
  href: string
  icon: any
  gradient: string
}) {
  return (
    <Link
      href={href}
      className="group relative overflow-hidden rounded-xl border-2 border-slate-200 hover:border-transparent transition-all duration-300 bg-white hover:shadow-lg"
    >
      <div className="p-6">
        <div className={`inline-flex p-3 rounded-xl bg-gradient-to-br ${gradient} mb-4 group-hover:scale-110 transition-transform duration-300`}>
          <Icon className="h-6 w-6 text-white" />
        </div>
        <h3 className="font-semibold text-slate-900 mb-2 text-lg">{title}</h3>
        <p className="text-sm text-slate-600 mb-4">{description}</p>
        <div className="flex items-center text-sm font-medium text-blue-600 group-hover:text-blue-700">
          Get Started
          <ArrowUpRight className="w-4 h-4 ml-1 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
        </div>
      </div>
    </Link>
  )
}
