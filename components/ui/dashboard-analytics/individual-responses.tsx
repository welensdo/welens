'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Eye, Calendar, User, Glasses } from 'lucide-react';

interface IndividualResponsesProps {
  analytics?: any;
}

export function IndividualResponses({ analytics }: IndividualResponsesProps) {
  const [responses, setResponses] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedResponse, setSelectedResponse] = useState<any>(null);

  useEffect(() => {
    const fetchResponses = async () => {
      try {
        const response = await fetch('/api/typeform/responses');
        if (!response.ok) {
          throw new Error('Failed to fetch responses');
        }
        const data = await response.json();
        setResponses(data.slice(0, 10)); // Mostrar solo las últimas 10
      } catch (error) {
        console.error('Error fetching responses:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchResponses();
  }, []);

  const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString('es-MX', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getInitials = (firstName?: string, lastName?: string) => {
    if (!firstName && !lastName) return 'AN';
    return `${firstName?.charAt(0) || ''}${lastName?.charAt(0) || ''}`.toUpperCase();
  };

  if (loading) {
    return (
      <Card className="col-span-1 md:col-span-2 border-hairline-silver">
        <CardHeader>
          <CardTitle className="text-ink">Respuestas Recientes</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-center py-8">
            <div className="w-6 h-6 border-2 border-accent-blue border-t-transparent rounded-full animate-spin"></div>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="col-span-1 md:col-span-2 border-hairline-silver">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="text-ink">Respuestas Recientes</CardTitle>
        <Badge variant="secondary" className="bg-accent-blue/10 text-accent-blue">
          {responses.length} respuestas
        </Badge>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {responses.length === 0 ? (
            <div className="text-center py-8">
              <User className="w-12 h-12 text-slate mx-auto mb-4" />
              <p className="text-slate">No hay respuestas disponibles</p>
            </div>
          ) : (
            responses.map((response) => (
              <div
                key={response._id}
                className="flex items-center space-x-4 p-4 rounded-lg border border-hairline-silver hover:bg-studio-mist/30 transition-colors cursor-pointer"
                onClick={() => setSelectedResponse(response)}
              >
                <Avatar className="w-10 h-10">
                  <AvatarFallback className="bg-accent-blue/10 text-accent-blue font-medium">
                    {getInitials(response.firstName, response.lastName)}
                  </AvatarFallback>
                </Avatar>
                
                <div className="flex-1 min-w-0">
                  <div className="flex items-center space-x-2">
                    <p className="text-sm font-medium text-ink truncate">
                      {response.firstName && response.lastName 
                        ? `${response.firstName} ${response.lastName}`
                        : 'Usuario Anónimo'
                      }
                    </p>
                    {response.usesGlasses && (
                      <Glasses className="w-4 h-4 text-accent-blue" />
                    )}
                  </div>
                  <div className="flex items-center space-x-4 mt-1">
                    <div className="flex items-center text-xs text-slate">
                      <Calendar className="w-3 h-3 mr-1" />
                      {formatDate(response.submittedAt)}
                    </div>
                    {response.age && (
                      <div className="flex items-center text-xs text-slate">
                        <User className="w-3 h-3 mr-1" />
                        {response.age} años
                      </div>
                    )}
                    {response.visionConditions?.length > 0 && (
                      <div className="flex items-center text-xs text-slate">
                        <Eye className="w-3 h-3 mr-1" />
                        {response.visionConditions.includes('none') ? 'Sin condiciones' : 'Con condiciones'}
                      </div>
                    )}
                  </div>
                </div>

                <Button variant="outline" size="sm">
                  Ver detalles
                </Button>
              </div>
            ))
          )}
        </div>
        
        {responses.length > 0 && (
          <div className="mt-6 text-center">
            <Button variant="outline" className="w-full">
              Ver todas las respuestas
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
}