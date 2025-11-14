import { Icon } from "@iconify/react";

export function SleepHistory() {
	return (
		<div className="flex flex-col h-screen bg-background text-foreground">
			<div className="flex items-center justify-between px-6 py-4">
				<div>
					<h1 className="text-2xl font-semibold font-heading">Sleep History</h1>
					<p className="text-sm text-muted-foreground">Track your sleep patterns</p>
				</div>
				<button className="flex items-center justify-center size-11 rounded-full bg-card">
					<Icon icon="solar:calendar-bold" className="size-6 text-foreground" />
				</button>
			</div>
			<div className="px-6">
				<div className="flex gap-2 bg-card rounded-2xl p-1">
					<button className="flex-1 py-2.5 bg-primary text-primary-foreground rounded-xl font-semibold text-sm">
						Week
					</button>
					<button className="flex-1 py-2.5 text-muted-foreground rounded-xl font-semibold text-sm">
						Month
					</button>
					<button className="flex-1 py-2.5 text-muted-foreground rounded-xl font-semibold text-sm">
						Year
					</button>
				</div>
			</div>
			<div className="flex-1 px-6 pb-24 mt-6">
				<div className="bg-card rounded-3xl p-6">
					<h2 className="text-lg font-semibold font-heading mb-4">Weekly Overview</h2>
					<div className="flex items-end justify-between gap-3 h-32">
						<div className="flex-1 flex flex-col items-center gap-2">
							<div className="w-full bg-primary/20 rounded-t-xl h-24 flex items-end">
								<div className="w-full bg-primary rounded-t-xl h-20" />
							</div>
							<span className="text-xs text-muted-foreground">Mon</span>
						</div>
						<div className="flex-1 flex flex-col items-center gap-2">
							<div className="w-full bg-primary/20 rounded-t-xl h-24 flex items-end">
								<div className="w-full bg-primary rounded-t-xl h-16" />
							</div>
							<span className="text-xs text-muted-foreground">Tue</span>
						</div>
						<div className="flex-1 flex flex-col items-center gap-2">
							<div className="w-full bg-primary/20 rounded-t-xl h-24 flex items-end">
								<div className="w-full bg-primary rounded-t-xl h-20" />
							</div>
							<span className="text-xs text-muted-foreground">Wed</span>
						</div>
						<div className="flex-1 flex flex-col items-center gap-2">
							<div className="w-full bg-primary/20 rounded-t-xl h-24 flex items-end">
								<div className="w-full bg-primary rounded-t-xl h-24" />
							</div>
							<span className="text-xs text-muted-foreground">Thu</span>
						</div>
						<div className="flex-1 flex flex-col items-center gap-2">
							<div className="w-full bg-primary/20 rounded-t-xl h-24 flex items-end">
								<div className="w-full bg-primary rounded-t-xl h-16" />
							</div>
							<span className="text-xs text-muted-foreground">Fri</span>
						</div>
						<div className="flex-1 flex flex-col items-center gap-2">
							<div className="w-full bg-primary/20 rounded-t-xl h-24 flex items-end">
								<div className="w-full bg-primary rounded-t-xl h-12" />
							</div>
							<span className="text-xs text-muted-foreground">Sat</span>
						</div>
						<div className="flex-1 flex flex-col items-center gap-2">
							<div className="w-full bg-primary/20 rounded-t-xl h-24 flex items-end">
								<div className="w-full bg-primary rounded-t-xl h-14" />
							</div>
							<span className="text-xs text-muted-foreground">Sun</span>
						</div>
					</div>
					<div className="mt-4 flex items-center justify-between text-sm">
						<span className="text-muted-foreground">Average</span>
						<span className="font-semibold">7h 15m</span>
					</div>
				</div>
				<div className="mt-6">
					<h2 className="text-lg font-semibold font-heading mb-4">Sleep Sessions</h2>
					<div className="space-y-3">
						<div className="bg-card rounded-2xl p-4">
							<div className="flex items-start justify-between">
								<div className="flex-1">
									<div className="flex items-center gap-2 mb-2">
										<h3 className="font-semibold">Thursday, Dec 14</h3>
										<div className="flex gap-0.5">
											<Icon icon="solar:star-bold" className="size-4 text-accent" />
											<Icon icon="solar:star-bold" className="size-4 text-accent" />
											<Icon icon="solar:star-bold" className="size-4 text-accent" />
											<Icon icon="solar:star-bold" className="size-4 text-accent" />
											<Icon icon="solar:star-bold" className="size-4 text-muted" />
										</div>
									</div>
									<div className="flex items-center gap-4 text-sm text-muted-foreground">
										<div className="flex items-center gap-1">
											<Icon icon="solar:moon-sleep-bold" className="size-4" />
											<span>7h 30m</span>
										</div>
										<div className="flex items-center gap-1">
											<Icon icon="solar:clock-circle-bold" className="size-4" />
											<span>11:30 PM - 7:00 AM</span>
										</div>
									</div>
								</div>
								<div className="text-right">
									<div className="text-2xl font-semibold text-accent">85%</div>
									<div className="text-xs text-muted-foreground">Quality</div>
								</div>
							</div>
						</div>
						<div className="bg-card rounded-2xl p-4">
							<div className="flex items-start justify-between">
								<div className="flex-1">
									<div className="flex items-center gap-2 mb-2">
										<h3 className="font-semibold">Wednesday, Dec 13</h3>
										<div className="flex gap-0.5">
											<Icon icon="solar:star-bold" className="size-4 text-accent" />
											<Icon icon="solar:star-bold" className="size-4 text-accent" />
											<Icon icon="solar:star-bold" className="size-4 text-accent" />
											<Icon icon="solar:star-bold" className="size-4 text-muted" />
											<Icon icon="solar:star-bold" className="size-4 text-muted" />
										</div>
									</div>
									<div className="flex items-center gap-4 text-sm text-muted-foreground">
										<div className="flex items-center gap-1">
											<Icon icon="solar:moon-sleep-bold" className="size-4" />
											<span>6h 45m</span>
										</div>
										<div className="flex items-center gap-1">
											<Icon icon="solar:clock-circle-bold" className="size-4" />
											<span>12:00 AM - 6:45 AM</span>
										</div>
									</div>
								</div>
								<div className="text-right">
									<div className="text-2xl font-semibold text-chart-5">72%</div>
									<div className="text-xs text-muted-foreground">Quality</div>
								</div>
							</div>
						</div>
						<div className="bg-card rounded-2xl p-4">
							<div className="flex items-start justify-between">
								<div className="flex-1">
									<div className="flex items-center gap-2 mb-2">
										<h3 className="font-semibold">Tuesday, Dec 12</h3>
										<div className="flex gap-0.5">
											<Icon icon="solar:star-bold" className="size-4 text-accent" />
											<Icon icon="solar:star-bold" className="size-4 text-accent" />
											<Icon icon="solar:star-bold" className="size-4 text-accent" />
											<Icon icon="solar:star-bold" className="size-4 text-accent" />
											<Icon icon="solar:star-bold" className="size-4 text-accent" />
										</div>
									</div>
									<div className="flex items-center gap-4 text-sm text-muted-foreground">
										<div className="flex items-center gap-1">
											<Icon icon="solar:moon-sleep-bold" className="size-4" />
											<span>8h 15m</span>
										</div>
										<div className="flex items-center gap-1">
											<Icon icon="solar:clock-circle-bold" className="size-4" />
											<span>11:00 PM - 7:15 AM</span>
										</div>
									</div>
								</div>
								<div className="text-right">
									<div className="text-2xl font-semibold text-accent">92%</div>
									<div className="text-xs text-muted-foreground">Quality</div>
								</div>
							</div>
						</div>
						<div className="bg-card rounded-2xl p-4">
							<div className="flex items-start justify-between">
								<div className="flex-1">
									<div className="flex items-center gap-2 mb-2">
										<h3 className="font-semibold">Monday, Dec 11</h3>
										<div className="flex gap-0.5">
											<Icon icon="solar:star-bold" className="size-4 text-accent" />
											<Icon icon="solar:star-bold" className="size-4 text-accent" />
											<Icon icon="solar:star-bold" className="size-4 text-accent" />
											<Icon icon="solar:star-bold" className="size-4 text-muted" />
											<Icon icon="solar:star-bold" className="size-4 text-muted" />
										</div>
									</div>
									<div className="flex items-center gap-4 text-sm text-muted-foreground">
										<div className="flex items-center gap-1">
											<Icon icon="solar:moon-sleep-bold" className="size-4" />
											<span>6h 20m</span>
										</div>
										<div className="flex items-center gap-1">
											<Icon icon="solar:clock-circle-bold" className="size-4" />
											<span>12:30 AM - 6:50 AM</span>
										</div>
									</div>
								</div>
								<div className="text-right">
									<div className="text-2xl font-semibold text-chart-5">68%</div>
									<div className="text-xs text-muted-foreground">Quality</div>
								</div>
							</div>
						</div>
						<div className="bg-card rounded-2xl p-4">
							<div className="flex items-start justify-between">
								<div className="flex-1">
									<div className="flex items-center gap-2 mb-2">
										<h3 className="font-semibold">Sunday, Dec 10</h3>
										<div className="flex gap-0.5">
											<Icon icon="solar:star-bold" className="size-4 text-accent" />
											<Icon icon="solar:star-bold" className="size-4 text-accent" />
											<Icon icon="solar:star-bold" className="size-4 text-accent" />
											<Icon icon="solar:star-bold" className="size-4 text-accent" />
											<Icon icon="solar:star-bold" className="size-4 text-muted" />
										</div>
									</div>
									<div className="flex items-center gap-4 text-sm text-muted-foreground">
										<div className="flex items-center gap-1">
											<Icon icon="solar:moon-sleep-bold" className="size-4" />
											<span>7h 00m</span>
										</div>
										<div className="flex items-center gap-1">
											<Icon icon="solar:clock-circle-bold" className="size-4" />
											<span>11:45 PM - 6:45 AM</span>
										</div>
									</div>
								</div>
								<div className="text-right">
									<div className="text-2xl font-semibold text-accent">80%</div>
									<div className="text-xs text-muted-foreground">Quality</div>
								</div>
							</div>
						</div>
						<div className="bg-card rounded-2xl p-4">
							<div className="flex items-start justify-between">
								<div className="flex-1">
									<div className="flex items-center gap-2 mb-2">
										<h3 className="font-semibold">Saturday, Dec 9</h3>
										<div className="flex gap-0.5">
											<Icon icon="solar:star-bold" className="size-4 text-accent" />
											<Icon icon="solar:star-bold" className="size-4 text-accent" />
											<Icon icon="solar:star-bold" className="size-4 text-muted" />
											<Icon icon="solar:star-bold" className="size-4 text-muted" />
											<Icon icon="solar:star-bold" className="size-4 text-muted" />
										</div>
									</div>
									<div className="flex items-center gap-4 text-sm text-muted-foreground">
										<div className="flex items-center gap-1">
											<Icon icon="solar:moon-sleep-bold" className="size-4" />
											<span>5h 30m</span>
										</div>
										<div className="flex items-center gap-1">
											<Icon icon="solar:clock-circle-bold" className="size-4" />
											<span>1:00 AM - 6:30 AM</span>
										</div>
									</div>
								</div>
								<div className="text-right">
									<div className="text-2xl font-semibold text-destructive">58%</div>
									<div className="text-xs text-muted-foreground">Quality</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
			<div className="fixed bottom-0 left-0 right-0 bg-card border-t border-border">
				<div className="flex items-center justify-around py-3">
					<button className="flex items-center px-4 py-2 justify-center">
						<Icon icon="solar:home-2-bold" className="size-6 text-muted-foreground" />
					</button>
					<button className="flex items-center px-4 py-2 justify-center">
						<Icon icon="solar:chart-bold" className="size-6 text-muted-foreground" />
					</button>
					<button className="flex items-center px-4 py-2 justify-center">
						<Icon icon="mdi:clock" className="size-6 text-primary" />
					</button>
					<button className="flex items-center px-4 py-2 justify-center">
						<Icon icon="solar:user-bold" className="size-6 text-muted-foreground" />
					</button>
				</div>
			</div>
		</div>
	);
}
