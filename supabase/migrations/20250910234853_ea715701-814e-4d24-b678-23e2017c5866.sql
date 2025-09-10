-- Create batches table for farmer dashboard
CREATE TABLE public.batches (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  batch_id TEXT NOT NULL UNIQUE,
  crop_type TEXT NOT NULL,
  variety TEXT NOT NULL,
  harvest_date DATE NOT NULL,
  quantity INTEGER NOT NULL,
  unit TEXT NOT NULL,
  farm_location TEXT NOT NULL,
  additional_details TEXT,
  certificates JSONB DEFAULT '[]'::jsonb,
  blockchain_tx TEXT,
  farmer_id UUID NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.batches ENABLE ROW LEVEL SECURITY;

-- Create policies for farmer access
CREATE POLICY "Farmers can view their own batches" 
ON public.batches 
FOR SELECT 
USING (auth.uid() = farmer_id);

CREATE POLICY "Farmers can create their own batches" 
ON public.batches 
FOR INSERT 
WITH CHECK (auth.uid() = farmer_id);

CREATE POLICY "Farmers can update their own batches" 
ON public.batches 
FOR UPDATE 
USING (auth.uid() = farmer_id);

CREATE POLICY "Farmers can delete their own batches" 
ON public.batches 
FOR DELETE 
USING (auth.uid() = farmer_id);

-- Create trigger for automatic timestamp updates
CREATE TRIGGER update_batches_updated_at
BEFORE UPDATE ON public.batches
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

-- Create index for better performance
CREATE INDEX idx_batches_farmer_id ON public.batches(farmer_id);
CREATE INDEX idx_batches_batch_id ON public.batches(batch_id);
CREATE INDEX idx_batches_created_at ON public.batches(created_at DESC);