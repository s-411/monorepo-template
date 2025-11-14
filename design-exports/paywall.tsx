import { Icon } from "@iconify/react";

export function Paywall() {
	return (
		<div className="flex flex-col h-full bg-gradient-to-b from-background via-[#1a1135] to-secondary/30 text-foreground overflow-hidden relative">
			<div className="absolute inset-0 overflow-hidden pointer-events-none">
				<div className="absolute top-[10%] left-[15%] size-32 bg-primary/20 rounded-full blur-3xl animate-pulse" />
				<div className="absolute top-[25%] right-[10%] size-40 bg-accent/15 rounded-full blur-3xl animate-pulse delay-500" />
				<div className="absolute bottom-[30%] left-[8%] size-36 bg-secondary/20 rounded-full blur-3xl animate-pulse delay-1000" />
				<div className="absolute top-[15%] right-[25%] animate-pulse">
					<Icon icon="solar:star-bold" className="size-4 text-accent/70" />
				</div>
				<div className="absolute top-[35%] right-[15%] animate-pulse delay-300">
					<Icon icon="solar:star-bold" className="size-3 text-primary/60" />
				</div>
				<div className="absolute top-[45%] left-[20%] animate-pulse delay-700">
					<Icon icon="solar:star-bold" className="size-5 text-accent/50" />
				</div>
				<div className="absolute bottom-[40%] right-[30%] animate-pulse delay-500">
					<Icon icon="solar:star-bold" className="size-3 text-secondary/70" />
				</div>
				<div className="absolute top-[60%] left-[12%] animate-pulse delay-1000">
					<Icon icon="solar:star-bold" className="size-4 text-primary/50" />
				</div>
				<div className="absolute bottom-[25%] right-[18%] animate-pulse delay-200">
					<Icon icon="solar:star-bold" className="size-3 text-accent/60" />
				</div>
			</div>
			<div className="relative z-10 px-4 pt-4">
				<button className="flex items-center justify-center size-11 rounded-full bg-card/60 backdrop-blur-md shadow-lg shadow-primary/10">
					<Icon icon="solar:close-circle-bold" className="size-6 text-foreground" />
				</button>
			</div>
			<div className="flex-1 flex flex-col px-6 pb-6 relative z-10 overflow-y-auto">
				<div className="text-center mb-8 pt-4">
					<div className="relative inline-block mb-4">
						<div className="absolute inset-0 bg-gradient-to-br from-primary/40 via-secondary/30 to-accent/20 blur-2xl rounded-full animate-pulse" />
						<div className="relative flex items-center justify-center size-20 bg-gradient-to-br from-primary/30 to-secondary/20 rounded-full shadow-xl shadow-primary/30">
							<Icon icon="solar:moon-stars-bold" className="size-10 drop-shadow-lg" />
						</div>
					</div>
					<h1 className="text-3xl font-bold font-heading mb-2 drop-shadow-lg">Unlock Premium</h1>
					<p className="text-muted-foreground">Get full access to all premium features</p>
				</div>
				<div className="space-y-3 mb-6">
					<div className="relative bg-gradient-to-r from-card/60 to-card/40 backdrop-blur-md rounded-2xl border-2 border-accent/40 p-4 shadow-xl shadow-accent/20">
						<div className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 bg-gradient-to-r from-accent to-accent/80 rounded-full shadow-lg">
							<p className="text-xs font-bold text-accent-foreground">BEST VALUE</p>
						</div>
						<div className="flex items-center justify-between mb-3">
							<div>
								<p className="text-sm text-muted-foreground">Annual Plan</p>
								<div className="flex items-baseline gap-2">
									<h2 className="text-3xl font-bold font-heading">$49.99</h2>
									<p className="text-sm text-muted-foreground line-through">$119.99</p>
								</div>
								<p className="text-xs text-accent mt-1">Save 58% • $4.17/month</p>
							</div>
							<div className="flex items-center justify-center size-16 bg-gradient-to-br from-accent/30 to-accent/10 rounded-xl shadow-inner">
								<Icon icon="solar:star-bold" className="size-8 text-accent drop-shadow-md" />
							</div>
						</div>
						<div className="pt-3 border-t border-accent/20">
							<p className="text-xs text-muted-foreground">Billed annually • Cancel anytime</p>
						</div>
					</div>
					<div className="bg-gradient-to-r from-card/60 to-card/40 backdrop-blur-md rounded-2xl border border-primary/20 p-4 shadow-lg shadow-primary/10">
						<div className="flex items-center justify-between">
							<div>
								<p className="text-sm text-muted-foreground">Monthly Plan</p>
								<div className="flex items-baseline gap-2">
									<h2 className="text-3xl font-bold font-heading">$9.99</h2>
								</div>
								<p className="text-xs text-muted-foreground mt-1">Billed monthly</p>
							</div>
							<div className="flex items-center justify-center size-16 bg-gradient-to-br from-primary/30 to-primary/10 rounded-xl shadow-inner">
								<Icon icon="solar:calendar-bold" className="size-8 text-primary drop-shadow-md" />
							</div>
						</div>
					</div>
				</div>
				<div className="space-y-3 mb-6">
					<h3 className="text-sm font-semibold text-muted-foreground mb-3">PREMIUM FEATURES</h3>
					<div className="flex items-start gap-3">
						<div className="flex items-center justify-center size-8 bg-gradient-to-br from-primary/30 to-primary/10 rounded-lg shadow-inner flex-shrink-0">
							<Icon icon="solar:check-circle-bold" className="size-5 text-primary drop-shadow-md" />
						</div>
						<div>
							<p className="font-medium">Unlimited Sleep Tracking</p>
							<p className="text-sm text-muted-foreground">Track every night without limits</p>
						</div>
					</div>
					<div className="flex items-start gap-3">
						<div className="flex items-center justify-center size-8 bg-gradient-to-br from-primary/30 to-primary/10 rounded-lg shadow-inner flex-shrink-0">
							<Icon icon="solar:check-circle-bold" className="size-5 text-primary drop-shadow-md" />
						</div>
						<div>
							<p className="font-medium">Advanced Analytics</p>
							<p className="text-sm text-muted-foreground">
								Deep insights into your sleep patterns
							</p>
						</div>
					</div>
					<div className="flex items-start gap-3">
						<div className="flex items-center justify-center size-8 bg-gradient-to-br from-accent/30 to-accent/10 rounded-lg shadow-inner flex-shrink-0">
							<Icon icon="solar:check-circle-bold" className="size-5 text-accent drop-shadow-md" />
						</div>
						<div>
							<p className="font-medium">Smart Wake Alarms</p>
							<p className="text-sm text-muted-foreground">Wake up at optimal sleep phase</p>
						</div>
					</div>
					<div className="flex items-start gap-3">
						<div className="flex items-center justify-center size-8 bg-gradient-to-br from-accent/30 to-accent/10 rounded-lg shadow-inner flex-shrink-0">
							<Icon icon="solar:check-circle-bold" className="size-5 text-accent drop-shadow-md" />
						</div>
						<div>
							<p className="font-medium">Sleep Sounds Library</p>
							<p className="text-sm text-muted-foreground">100+ relaxing sounds & meditations</p>
						</div>
					</div>
					<div className="flex items-start gap-3">
						<div className="flex items-center justify-center size-8 bg-gradient-to-br from-secondary/30 to-secondary/10 rounded-lg shadow-inner flex-shrink-0">
							<Icon
								icon="solar:check-circle-bold"
								className="size-5 text-secondary drop-shadow-md"
							/>
						</div>
						<div>
							<p className="font-medium">Export & Sync Data</p>
							<p className="text-sm text-muted-foreground">Backup and access anywhere</p>
						</div>
					</div>
					<div className="flex items-start gap-3">
						<div className="flex items-center justify-center size-8 bg-gradient-to-br from-secondary/30 to-secondary/10 rounded-lg shadow-inner flex-shrink-0">
							<Icon
								icon="solar:check-circle-bold"
								className="size-5 text-secondary drop-shadow-md"
							/>
						</div>
						<div>
							<p className="font-medium">Priority Support</p>
							<p className="text-sm text-muted-foreground">Get help when you need it</p>
						</div>
					</div>
				</div>
			</div>
			<div className="px-6 pb-6 space-y-4 relative z-10">
				<button className="w-full py-4 px-6 bg-gradient-to-r from-primary via-secondary to-primary text-primary-foreground rounded-2xl font-semibold text-lg shadow-2xl shadow-primary/40 relative overflow-hidden">
					<div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent blur-sm" />
					Continue to Payment
				</button>
				<div className="text-center space-y-2">
					<button className="text-sm font-medium text-muted-foreground">Restore Purchases</button>
					<p className="text-xs text-muted-foreground px-4 leading-relaxed">
						By continuing, you agree to our <span className="underline">Terms of Service</span> and{" "}
						<span className="underline">Privacy Policy</span>. Subscription renews automatically
						unless canceled.
					</p>
				</div>
			</div>
		</div>
	);
}
