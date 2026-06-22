/* <div className="w-full max-w-4xl mx-auto">

        <DashboardHeader
            title = "Learning Dashboard"
            description="Track your Mandarin learning progress and memory retention."
        />

        <DashboardHero
            label="Reviews Due Today"
            value={stats?.dueReviews ?? 0}
            Icon={Clock3}
            desc={"Words waiting to be reviewed based on the memory model."}
        />

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">

          <DashboardStats
              label={"Learned Words"}
              value={stats?.totalLearnedWords ?? 0}
              Icon = {BookOpen}
            />

          <DashboardStats
              label={"Total Reviews"}
              value={stats?.totalReviews ?? 0}
              Icon = {GraduationCap}
            />

          <DashboardStats
              label={"Accuracy"}
              value={`${stats?.averageAccuracy?.toFixed(1) ?? "0"} %`}
              Icon = {Target}
            />

          <DashboardStats
              label={"Recall Probability"}
              value={`${stats?.averageRecall?.toFixed(1) ?? "0"} %`}
              Icon = {TrendingUp}
            />
        </div>

        <MemoryModel
            title={"Memory Model Status"}
            label={"Average Half-Life"}
            value={stats?.averageHalfLife?.toFixed(1) ?? 0}
            Icon={Brain}
            desc={"Current average retention level"}
          />


        <div className="grid grid-cols-2 gap-3 mt-4">
          <ButtonPrimary 
              label="Start Review" 
              onClick={()=>(window.location.href ="/review")}
            />
          <ButtonSecondary
              label="Learn New Words" 
              onClick={()=>(window.location.href ="/flash-card")}
            />
        </div>
         
      </div> */