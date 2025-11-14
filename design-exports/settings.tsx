import { Icon } from "@iconify/react";

export function Settings() {
	return (
		<div className="flex flex-col h-screen bg-background text-foreground">
			<div className="flex items-center justify-between px-4 py-3 border-b border-border">
				<button className="flex items-center justify-center size-11">
					<Icon icon="solar:arrow-left-linear" className="size-6" />
				</button>
				<h1 className="text-lg font-semibold font-heading">Settings</h1>
				<div className="size-11" />
			</div>
			<div className="flex-1 overflow-y-auto pb-24 px-6 pt-6">
				<div className="mb-6">
					<h2 className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-3 px-4">
						Account
					</h2>
					<div className="bg-card rounded-2xl overflow-hidden">
						<button className="w-full flex items-center justify-between px-4 py-4 border-b border-background/50">
							<div className="flex items-center gap-4">
								<div className="flex items-center justify-center size-10 rounded-full bg-primary/10">
									<Icon icon="solar:user-bold" className="size-5 text-primary" />
								</div>
								<div className="text-left">
									<div className="font-medium">Profile Settings</div>
									<div className="text-sm text-muted-foreground">
										Edit your personal information
									</div>
								</div>
							</div>
							<Icon icon="solar:alt-arrow-right-linear" className="size-5 text-muted-foreground" />
						</button>
						<button className="w-full flex items-center justify-between px-4 py-4">
							<div className="flex items-center gap-4">
								<div className="flex items-center justify-center size-10 rounded-full bg-accent/10">
									<Icon icon="solar:shield-check-bold" className="size-5 text-accent" />
								</div>
								<div className="text-left">
									<div className="font-medium">Privacy & Security</div>
									<div className="text-sm text-muted-foreground">Manage your account security</div>
								</div>
							</div>
							<Icon icon="solar:alt-arrow-right-linear" className="size-5 text-muted-foreground" />
						</button>
					</div>
				</div>
				<div className="mb-6">
					<h2 className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-3 px-4">
						Preferences
					</h2>
					<div className="bg-card rounded-2xl overflow-hidden">
						<button className="w-full flex items-center justify-between px-4 py-4 border-b border-background/50">
							<div className="flex items-center gap-4">
								<div className="flex items-center justify-center size-10 rounded-full bg-secondary/10">
									<Icon icon="solar:bell-bold" className="size-5 text-secondary" />
								</div>
								<div className="text-left">
									<div className="font-medium">Notifications</div>
									<div className="text-sm text-muted-foreground">Configure app notifications</div>
								</div>
							</div>
							<Icon icon="solar:alt-arrow-right-linear" className="size-5 text-muted-foreground" />
						</button>
						<button className="w-full flex items-center justify-between px-4 py-4">
							<div className="flex items-center gap-4">
								<div className="flex items-center justify-center size-10 rounded-full bg-primary/10">
									<Icon icon="solar:moon-sleep-bold" className="size-5 text-primary" />
								</div>
								<div className="text-left">
									<div className="font-medium">Sleep Goal</div>
									<div className="text-sm text-muted-foreground">Set your daily sleep target</div>
								</div>
							</div>
							<Icon icon="solar:alt-arrow-right-linear" className="size-5 text-muted-foreground" />
						</button>
					</div>
				</div>
				<div className="mb-6">
					<h2 className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-3 px-4">
						Data
					</h2>
					<div className="bg-card rounded-2xl overflow-hidden">
						<button className="w-full flex items-center justify-between px-4 py-4 border-b border-background/50">
							<div className="flex items-center gap-4">
								<div className="flex items-center justify-center size-10 rounded-full bg-chart-2/10">
									<Icon icon="solar:database-bold" className="size-5 text-chart-2" />
								</div>
								<div className="text-left">
									<div className="font-medium">Data & Privacy</div>
									<div className="text-sm text-muted-foreground">Manage your data preferences</div>
								</div>
							</div>
							<Icon icon="solar:alt-arrow-right-linear" className="size-5 text-muted-foreground" />
						</button>
						<button className="w-full flex items-center justify-between px-4 py-4">
							<div className="flex items-center gap-4">
								<div className="flex items-center justify-center size-10 rounded-full bg-chart-3/10">
									<Icon icon="solar:upload-bold" className="size-5 text-chart-3" />
								</div>
								<div className="text-left">
									<div className="font-medium">Export Data</div>
									<div className="text-sm text-muted-foreground">Download your sleep data</div>
								</div>
							</div>
							<Icon icon="solar:alt-arrow-right-linear" className="size-5 text-muted-foreground" />
						</button>
					</div>
				</div>
				<div className="mb-6">
					<h2 className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-3 px-4">
						About
					</h2>
					<div className="bg-card rounded-2xl overflow-hidden">
						<button className="w-full flex items-center justify-between px-4 py-4 border-b border-background/50">
							<div className="flex items-center gap-4">
								<div className="flex items-center justify-center size-10 rounded-full bg-muted/10">
									<Icon icon="solar:document-text-bold" className="size-5 text-muted-foreground" />
								</div>
								<div className="text-left">
									<div className="font-medium">Terms & Conditions</div>
									<div className="text-sm text-muted-foreground">Read our terms of service</div>
								</div>
							</div>
							<Icon icon="solar:alt-arrow-right-linear" className="size-5 text-muted-foreground" />
						</button>
						<button className="w-full flex items-center justify-between px-4 py-4">
							<div className="flex items-center gap-4">
								<div className="flex items-center justify-center size-10 rounded-full bg-muted/10">
									<Icon icon="solar:info-circle-bold" className="size-5 text-muted-foreground" />
								</div>
								<div className="text-left">
									<div className="font-medium">App Version</div>
									<div className="text-sm text-muted-foreground">Version 2.1.4</div>
								</div>
							</div>
						</button>
					</div>
				</div>
			</div>
			<div className="fixed bottom-0 left-0 right-0 bg-card border-t border-border">
				<div className="flex items-center justify-around py-3">
					<button className="flex flex-col items-center gap-1 px-4 py-2">
						<Icon icon="solar:home-2-bold" className="size-6 text-muted-foreground" />
					</button>
					<button className="flex flex-col items-center gap-1 px-4 py-2">
						<Icon icon="solar:chart-bold" className="size-6 text-muted-foreground" />
					</button>
					<button className="flex flex-col items-center gap-1 px-4 py-2">
						<Icon icon="mdi:clock" className="size-6 text-muted-foreground" />
					</button>
					<button className="flex flex-col items-center gap-1 px-4 py-2">
						<Icon icon="solar:user-bold" className="size-6 text-primary" />
					</button>
				</div>
			</div>
		</div>
	);
}
