import { Icon } from "@iconify/react";

export function Onboarding3() {
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
				<div className="absolute top-[20%] left-[35%] size-20 bg-gradient-to-br from-primary/10 to-transparent rounded-full blur-xl animate-pulse delay-400" />
				<div className="absolute bottom-[35%] right-[25%] size-24 bg-gradient-to-br from-accent/10 to-transparent rounded-full blur-xl animate-pulse delay-800" />
				<div className="absolute top-[50%] right-[8%] size-16 bg-gradient-to-br from-secondary/10 to-transparent rounded-full blur-xl animate-pulse delay-600" />
			</div>
			<div className="absolute top-4 right-6 z-20">
				<button className="px-5 py-2 text-muted-foreground text-sm font-medium">Skip</button>
			</div>
			<div className="flex-1 flex flex-col items-center justify-center px-6 pb-8 relative z-10">
				<div className="relative w-full max-w-sm mb-8">
					<div className="absolute inset-0 bg-gradient-to-br from-accent/40 via-primary/30 to-secondary/20 blur-3xl rounded-full animate-pulse" />
					<div className="relative flex items-center justify-center">
						<div className="absolute size-72 bg-gradient-to-br from-accent/30 via-primary/20 to-secondary/10 rounded-full blur-2xl animate-pulse delay-300" />
						<div className="absolute size-56 bg-gradient-to-tr from-primary/20 via-accent/15 to-secondary/25 rounded-full blur-xl animate-pulse delay-700" />
						<div className="relative bg-gradient-to-br from-accent/20 via-primary/30 to-secondary/10 rounded-full p-14 shadow-2xl shadow-accent/30">
							<div className="absolute inset-0 bg-gradient-to-tl from-primary/10 to-transparent rounded-full" />
							<Icon icon="solar:cup-star-bold" className="size-36 drop-shadow-2xl relative z-10" />
							<div className="absolute top-8 right-6 animate-pulse delay-200">
								<Icon icon="solar:star-bold" className="size-5 text-primary" />
							</div>
							<div className="absolute bottom-10 left-8 animate-pulse delay-600">
								<Icon icon="solar:star-bold" className="size-4 text-primary/70" />
							</div>
						</div>
					</div>
					<div className="absolute top-4 right-8 animate-pulse">
						<Icon icon="solar:star-bold" className="size-7 text-primary drop-shadow-lg" />
					</div>
					<div className="absolute bottom-12 left-4 animate-pulse delay-400">
						<Icon icon="solar:star-bold" className="size-5 text-primary/70 drop-shadow-md" />
					</div>
					<div className="absolute top-20 left-0 animate-pulse delay-600">
						<Icon icon="solar:star-bold" className="size-6 text-accent/90 drop-shadow-lg" />
					</div>
					<div className="absolute bottom-24 right-2 animate-pulse delay-800">
						<Icon icon="solar:star-bold" className="size-4 text-secondary/80 drop-shadow-md" />
					</div>
					<div className="absolute top-32 right-16 animate-pulse delay-1000">
						<Icon icon="solar:star-bold" className="size-3 text-primary/60" />
					</div>
					<div className="absolute top-6 left-20 size-12 bg-gradient-to-br from-accent/30 to-transparent rounded-full blur-lg animate-pulse delay-300" />
					<div className="absolute bottom-8 right-12 size-16 bg-gradient-to-br from-primary/25 to-transparent rounded-full blur-lg animate-pulse delay-700" />
				</div>
				<div className="text-center space-y-4 mb-12">
					<h1 className="text-4xl font-bold font-heading from-foreground leading-tight drop-shadow-lg">
						Start Your Journey
					</h1>
					<p className="text-lg text-muted-foreground leading-relaxed max-w-md mx-auto drop-shadow-sm">
						Join thousands of users achieving better sleep and waking up energized every day. Your
						path to restful nights begins now
					</p>
				</div>
				<div className="w-full max-w-sm space-y-3">
					<div className="flex items-center gap-3 px-4 py-3 bg-gradient-to-r from-card/60 to-card/40 backdrop-blur-md rounded-2xl border border-accent/20 shadow-lg shadow-accent/10">
						<div className="flex items-center justify-center size-10 bg-gradient-to-br from-accent/30 to-accent/10 rounded-xl shadow-inner">
							<Icon
								icon="solar:users-group-rounded-bold"
								className="size-5 text-accent drop-shadow-md"
							/>
						</div>
						<div className="flex-1">
							<p className="text-sm font-medium">Community Support</p>
							<p className="text-xs text-muted-foreground">Connect with others</p>
						</div>
					</div>
					<div className="flex items-center gap-3 px-4 py-3 bg-gradient-to-r from-card/60 to-card/40 backdrop-blur-md rounded-2xl border border-primary/20 shadow-lg shadow-primary/10">
						<div className="flex items-center justify-center size-10 bg-gradient-to-br from-primary/30 to-primary/10 rounded-xl shadow-inner">
							<Icon icon="solar:shield-check-bold" className="size-5 text-primary drop-shadow-md" />
						</div>
						<div className="flex-1">
							<p className="text-sm font-medium">Privacy First</p>
							<p className="text-xs text-muted-foreground">Your data is secure</p>
						</div>
					</div>
					<div className="flex items-center gap-3 px-4 py-3 bg-gradient-to-r from-card/60 to-card/40 backdrop-blur-md rounded-2xl border border-secondary/20 shadow-lg shadow-secondary/10">
						<div className="flex items-center justify-center size-10 bg-gradient-to-br from-secondary/30 to-secondary/10 rounded-xl shadow-inner">
							<Icon icon="solar:tag-price-bold" className="size-5 text-secondary drop-shadow-md" />
						</div>
						<div className="flex-1">
							<p className="text-sm font-medium">Free Forever</p>
							<p className="text-xs text-muted-foreground">No hidden costs</p>
						</div>
					</div>
				</div>
			</div>
			<div className="px-6 pb-8 space-y-3 relative z-10">
				<button className="w-full py-4 px-6 bg-gradient-to-r from-accent via-primary to-accent text-primary-foreground rounded-2xl font-semibold text-lg shadow-2xl shadow-accent/40 relative overflow-hidden">
					<div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent blur-sm" />
					Get Started
				</button>
				<div className="flex justify-center gap-2">
					<div className="size-2 bg-muted/30 rounded-full" />
					<div className="size-2 bg-muted/30 rounded-full" />
					<div className="size-2 bg-accent rounded-full shadow-lg shadow-accent/50" />
				</div>
			</div>
		</div>
	);
}
