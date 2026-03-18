import { db } from '@/lib/db';
import { AnalyticsWrapper } from '@/modules/analytics/components/analytics-wrapper';
import { OverviewCards } from '@/modules/analytics/components/overview-card';
import { RecentActivity } from '@/modules/analytics/components/recent-activity';
import { TopLinksTable } from '@/modules/analytics/components/top-links-table';
import { currentUser } from '@clerk/nextjs/server'
import React from 'react'
import { OverviewShimmer } from '@/modules/analytics/components/overview-shimmer';

const OverviewPage = async() => {
  const user = await currentUser();

  const id = await db.user.findUnique({
    where: { clerkId: user?.id },
    select: { id: true }
  });

  const userId = id?.id;

  // Show shimmer if no userId
  if (!userId) {
    return <OverviewShimmer />;
  }

  return (
      <div className="space-y-6">
       
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2 transition-colors duration-300">Analytics Overview</h1>
          <p className="text-muted-foreground transition-colors duration-300">
            Track your profile visits, link performance, and engagement metrics
          </p>
        </div>

        <OverviewCards userId={userId} />

     
        <div className="grid gap-6 lg:grid-cols-2">
       
          <div className="lg:col-span-2">
            <AnalyticsWrapper userId={userId} />
          </div>

      
          <TopLinksTable userId={userId} />

        
          <RecentActivity userId={userId} />
        </div>
      </div>
  )
}

export default OverviewPage