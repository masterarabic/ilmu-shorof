import { ListBulletIcon, PersonIcon } from "@radix-ui/react-icons";
import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";
import { Pie, PieChart, Sector } from "recharts";

import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/common/components/ui/avatar";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/common/components/ui/card";
import { ChartConfig, ChartContainer } from "@/common/components/ui/chart";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/common/components/ui/tabs";
import useBabCount from "@/modules/admin/hooks/dashboard/useBabCount";
import useLeaderBoard from "@/modules/admin/hooks/dashboard/useLeaderBoard";
import useScoreDistribution from "@/modules/admin/hooks/dashboard/useScoreDistribution";
import useStudentCount from "@/modules/admin/hooks/dashboard/useStudentCount";
import AdminMainLayout from "@/modules/admin/layouts/MainLayout";
import { NextPageWithLayout } from "@/pages/_app";

const DashboardPage: NextPageWithLayout = () => {
  const { studentCount } = useStudentCount();
  const { babCount } = useBabCount();

  return (
    <div>
      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="analytics" disabled>
            Dashboard
          </TabsTrigger>
        </TabsList>
        <TabsContent value="overview" className="space-y-4"></TabsContent>
      </Tabs>
      <div className="space-y-4">
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Jumlah Siswa
              </CardTitle>
              <PersonIcon className="text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{studentCount}</div>
              <p className="text-xs text-muted-foreground"></p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Jumlah Bab</CardTitle>
              <ListBulletIcon className="text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{babCount}</div>
              <p className="text-xs text-muted-foreground"></p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Disusun oleh
              </CardTitle>
              <PersonIcon className="text-muted-foreground" />
            </CardHeader>
            <CardContent className="pt-2 text-sm">
              <div>Siti Durotun Naseha, M.Pd</div>
              <div>Sri Widoyonongrum, ST., M.Pd</div>
            </CardContent>
          </Card>
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
          <Card className="col-span-4">
            <CardHeader>
              <CardTitle>Pembagian Score Per Bab</CardTitle>
            </CardHeader>
            <CardContent className="pl-2">
              <ChartSample />
            </CardContent>
          </Card>
          <Card className="col-span-3">
            <CardHeader>
              <CardTitle>Papan peringkat</CardTitle>
              <CardDescription>
                10 siswa terbaik berdasarkan jumlah score
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Leaderboard />
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export const Leaderboard = () => {
  const { leaderBoard } = useLeaderBoard();

  return (
    <div className="space-y-8">
      {leaderBoard.map((item) => (
        <Link
          key={item.id}
          href={{
            pathname: "/admin/siswa/[id]",
            query: { id: item.id },
          }}
          className="flex items-center"
        >
          <Avatar className="h-9 w-9">
            <AvatarImage src="/avatars/01.png" alt="Avatar" />
            <AvatarFallback>
              {item.name ? item.name.charAt(0).toUpperCase() : "-"}
            </AvatarFallback>
          </Avatar>
          <div className="ml-4 space-y-1">
            <p className="text-sm font-medium leading-none">
              {item.name ?? "-"}
            </p>
            <p className="text-sm text-muted-foreground">{item.email ?? "-"}</p>
          </div>
          <div className="ml-auto font-medium">{item.score ?? 0}</div>
        </Link>
      ))}
    </div>
  );
};

const chartConfig = {} satisfies ChartConfig;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const renderActiveShape = (props: any) => {
  const RADIAN = Math.PI / 180;
  const {
    cx,
    cy,
    midAngle,
    innerRadius,
    outerRadius,
    startAngle,
    endAngle,
    fill,
    payload,
    percent,
    value,
  } = props;
  const sin = Math.sin(-RADIAN * midAngle);
  const cos = Math.cos(-RADIAN * midAngle);
  const sx = cx + (outerRadius + 10) * cos;
  const sy = cy + (outerRadius + 10) * sin;
  const mx = cx + (outerRadius + 30) * cos;
  const my = cy + (outerRadius + 30) * sin;
  const ex = mx + (cos >= 0 ? 1 : -1) * 22;
  const ey = my;
  const textAnchor = cos >= 0 ? "start" : "end";

  return (
    <g>
      <text x={cx} y={cy} fontSize={16} dy={8} textAnchor="middle" fill={fill}>
        {payload.name}
      </text>
      <Sector
        cx={cx}
        cy={cy}
        innerRadius={innerRadius}
        outerRadius={outerRadius}
        startAngle={startAngle}
        endAngle={endAngle}
        fill={fill}
      />
      <Sector
        cx={cx}
        cy={cy}
        startAngle={startAngle}
        endAngle={endAngle}
        innerRadius={outerRadius + 6}
        outerRadius={outerRadius + 10}
        fill={fill}
      />
      <path
        d={`M${sx},${sy}L${mx},${my}L${ex},${ey}`}
        stroke={fill}
        fill="none"
      />
      <circle cx={ex} cy={ey} r={2} fill={fill} stroke="none" />
      <text
        x={ex + (cos >= 0 ? 1 : -1) * 12}
        y={ey}
        textAnchor={textAnchor}
        fill="#333"
      >{`Total nilai ${value}`}</text>
      <text
        x={ex + (cos >= 0 ? 1 : -1) * 12}
        y={ey}
        dy={18}
        textAnchor={textAnchor}
        fill="#999"
      >
        {`(Rate ${(percent * 100).toFixed(2)}%)`}
      </text>
    </g>
  );
};

export function ChartSample() {
  const router = useRouter();
  const [activeIndex, setActiveIndex] = React.useState(0);
  const { scoreDistribution } = useScoreDistribution();

  return (
    <ChartContainer config={chartConfig} className="min-h-[250px] w-full">
      <PieChart width={400} height={400}>
        <Pie
          activeIndex={activeIndex}
          activeShape={renderActiveShape}
          data={scoreDistribution}
          cx="50%"
          cy="50%"
          innerRadius={60}
          outerRadius={80}
          fill="#7C3AED"
          dataKey="score"
          onMouseEnter={(_, index) => setActiveIndex(index)}
          onClick={(data) => {
            router.push({
              pathname: "/admin/bab/[babId]",
              query: { babId: data?.payload?.payload?.id },
            });
          }}
          className="cursor-pointer"
        />
      </PieChart>
    </ChartContainer>
  );
}

DashboardPage.getLayout = (page) => {
  return <AdminMainLayout>{page}</AdminMainLayout>;
};

export default DashboardPage;
