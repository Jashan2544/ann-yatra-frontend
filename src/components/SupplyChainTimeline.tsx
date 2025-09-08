import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, Clock, Package, Store, User } from "lucide-react";

interface TimelineEvent {
  id: string;
  title: string;
  description: string;
  timestamp: string;
  status: "completed" | "current" | "pending";
  actor: string;
  location?: string;
  txHash?: string;
}

interface SupplyChainTimelineProps {
  events: TimelineEvent[];
}

const SupplyChainTimeline = ({ events }: SupplyChainTimelineProps) => {
  const getIcon = (index: number) => {
    const icons = [User, Package, Store, CheckCircle];
    const Icon = icons[index % icons.length];
    return <Icon className="w-5 h-5" />;
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed":
        return "bg-success text-success-foreground";
      case "current":
        return "bg-warning text-warning-foreground";
      default:
        return "bg-muted text-muted-foreground";
    }
  };

  return (
    <div className="space-y-6">
      {events.map((event, index) => (
        <div key={event.id} className="relative">
          {index < events.length - 1 && (
            <div className="absolute left-6 top-12 w-px h-20 bg-border" />
          )}
          
          <div className="flex items-start space-x-4">
            <div className={`flex items-center justify-center w-12 h-12 rounded-full ${getStatusColor(event.status)}`}>
              {getIcon(index)}
            </div>
            
            <Card className="flex-1 shadow-card">
              <CardContent className="p-4">
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <h3 className="font-semibold text-foreground">{event.title}</h3>
                    <p className="text-sm text-muted-foreground">{event.description}</p>
                  </div>
                  <Badge variant={event.status === "completed" ? "default" : "secondary"}>
                    {event.status === "completed" && <CheckCircle className="w-3 h-3 mr-1" />}
                    {event.status === "current" && <Clock className="w-3 h-3 mr-1" />}
                    {event.status.charAt(0).toUpperCase() + event.status.slice(1)}
                  </Badge>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-2 text-xs text-muted-foreground">
                  <div>
                    <span className="font-medium">Actor:</span> {event.actor}
                  </div>
                  {event.location && (
                    <div>
                      <span className="font-medium">Location:</span> {event.location}
                    </div>
                  )}
                  <div>
                    <span className="font-medium">Time:</span> {event.timestamp}
                  </div>
                </div>
                
                {event.txHash && (
                  <div className="mt-2 text-xs">
                    <span className="font-medium text-primary">Blockchain Tx:</span>{" "}
                    <code className="bg-muted px-1 py-0.5 rounded text-xs">
                      {event.txHash.slice(0, 20)}...
                    </code>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      ))}
    </div>
  );
};

export default SupplyChainTimeline;